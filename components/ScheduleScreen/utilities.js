import { Alert } from "react-native";
import AlertAsync from "react-native-alert-async";

const basicAlert = (type) => {
    let title = '';
    let msg = '';
    let nav = false;

    switch (type) {
        case 'tooMany':
            title = 'Sort out your priorities!';
            msg = 'You have a lot of tasks due today or tomorrow - or one of them takes a long time. If possible, update some due dates or durations for better functionality.';
        break;
        case 'soBusy':
            title = 'No fun day!';
            msg = 'Either your schedule is so busy, there is no time left for fun tasks today, or you haven\'t added any fun tasks. Hopefully, you can squeeze some in later!';
        break;
        case 'allDone':
            title = 'All done!';
            msg = 'All your tasks are marked as completed. Add some more to generate a schedule!';
            nav = true;
        break;
        case 'noTasks':
            title = 'Task List Empty';
            msg = 'Add some tasks to generate a schedule!';
            nav = true;
        break;
        default:
            title = 'Something went wrong!';
            msg = 'Most likely, your alotted daily time is shorter than any of your tasks. Change your preferences or task durations and try again. \nIf you think something else is causing this error, please submit feedback to the developer.'
    }
    
    const button = (nav) ? ({text: 'OK', onPress: () => props.navigation.navigate('Add')}) : ({text: 'OK'});

    Alert.alert(
        title,
        msg,
        [ button ],
        {cancelable: false}
    );
}

// builds new schedule from received tasks
const buildSchedule = async ({tasks, prefs, queued, createSchedule}) => {
    let {hours, maxHard, maxTedious, includeFun } = prefs;
    let schedule = [];
    let todos = [];
    // if no fun tasks need to be included, mark true
    let funIncluded = !includeFun;

    const date = new Date();
    const today = date.toISOString().substring(0, 10);
    date.setDate(date.getDate() + 1);
    const tomorrow = date.toISOString().substring(0, 10);

    const updateCounters = (task) => {
       hours -= task.duration;
       if (task.interest === 3) {
          funIncluded = true;
       } else if (task.interest === 1) {
          maxTedious--;
       }
       if (task.difficulty === 4)  maxHard--;
    };

    //  check that tasks exist that have not been completed or rescheduled
    if (!tasks || tasks.length === 0) {
       return basicAlert('noTasks');
    } else { 
        todos = tasks.filter(task => !task.completed);
        if (todos.length === 0) {
            return basicAlert('allDone');
        } else {
            // main scheduling algorithm
            scheduleGenerator: { 
            // add queued tasks
            if (queued.length > 0) {
                // retrieve tasks from todos
                const queuedTasks = todos.filter(task => queued.includes(task.id));
                queuedTasks.forEach(task => {
                // update counters, add task id to schedule, update todos
                updateCounters(task);
                schedule.push(task.id);
                });
                todos = todos.filter(task => !schedule.includes(task.id))
            }
            // tasks that are due today or tomorrow are always added
            const urgentTasks = todos.filter(task => {
            if (task.due.substring(0,10) === today) return true;
            if (task.due.substring(0,10) === tomorrow) return true;
            });

            if (urgentTasks) {
                urgentTasks.forEach( task => {
                    updateCounters(task);
                    schedule.push(task.id);
                });
                todos = todos.filter(task => !schedule.includes(task.id))
                // alert and finish schedule if urgents go over time
                if (hours < 0) {
                    basicAlert('tooMany');
                    break scheduleGenerator;
                } else if (hours === 0) {
                    if (!funIncluded) {
                        basicAlert('soBusy');
                    } 
                    break scheduleGenerator;
                }
                // finish if no todos left
                if (todos.length < 1) {
                    break scheduleGenerator;
                }
            }
            // sort remaining tasks by date and priority
            todos.sort((a, b) => a.priority - b.priority).sort((a, b) => a.due.localeCompare(b.due));

            // include a fun task if one can fit in remaining time
            if (!funIncluded) {
                let funTasks = todos.filter(task => task.interest === 3);

                if (funTasks.length > 0) {
                    // exclude difficult tasks if max reached
                    if (maxHard <= 0) {
                        funTasks = funTasks.filter( task => task.difficulty != 4); 
                    }
                    // exclude tasks that are too long for remaining time
                    funTasks = funTasks.filter( task => task.duration < hours);
                    // add task to schedule, update counters, continue
                    if (funTasks.length > 0) {
                        let funTask = funTasks[0];
                        schedule.push(funTask.id);

                        if (funTask.difficulty === 4) maxHard--;
                        hours -= funTask.duration;
                        funIncluded = true;
                        todos = todos.filter(task => task.id != funTask.id);
                    }
                    // *** ELSE ALERT THAT FUN TASKS ARE TOO LONG *** 
                }   
            }
            // if most pressing task is too long for the entire time alotted
            if (schedule.length === 0) {
                // runs until a task is added or none left
                for (let i = 0; (schedule.length < 1); i++) {
                    // if none left, all are too long & user chose not to add
                    if (i === todos.length) {
                        break scheduleGenerator;
                    }

                    let firstTask = todos[i];
                    // if task fits, add it
                    if (hours > firstTask.duration) {
                        schedule.push(firstTask.id);
                        updateCounters(firstTask);
                        todos = todos.filter(task => task.id !== firstTask.id);
                    } else {
                    // if task too long, let user decide 
                        const scheduleIt = await AlertAsync(
                        'Very Long Task',
                        `\'${firstTask.task}\' is the most pressing, but it would take up all your time today. Is that OK?`,
                        [
                            {
                                text: 'Schedule it',
                                onPress: () => 'yes'
                            },
                            {
                                text: 'No, skip it',
                                onPress: () => Promise.resolve('no')
                            }
                            
                        ],
                        { cancelable: false }
                        ); 
                    
                        if (scheduleIt === 'yes') {
                        schedule.push(firstTask.id);
                        // no need to update counters/todos if task too long
                        break scheduleGenerator;
                        }
                    }   
                }
            }
            
            // add remaining tasks from todos until schedule is full
            todos.forEach( task => {
                if (task.duration <= hours) {
                    // check against difficulty and tedium counters
                    if (((task.difficulty === 4) && (maxHard <= 0)) || 
                        ((task.interest === 1) && (maxTedious <= 0))) {
                        return;
                    } else {
                        updateCounters(task);
                        schedule.push(task.id);
                    }
                }
            });
            } // end of scheduleGenerator
        }

        if (schedule.length > 0) {
            createSchedule({schedule: schedule, forDate: today});
        } else {
            basicAlert();
        }
    }
}

export {buildSchedule};