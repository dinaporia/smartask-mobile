# SmarTask
> a smart to-do list app
SmarTask takes care of organizing and scheduling your to-dos, so you can focus on completing them.

## Intro
This was my first solo project using React Native. I particularly learned a lot about using Redux (with Redux Toolkit), Drawer and Tab navigation, and conditional rendering of components. I hope to have it in deployable shape soon!

## Technologies
SmarTask was built using React Native and Expo CLI

## Current Features
Two ways to add new tasks:
    quick add uses default settings for task options
    add details allows user to set task options
Task options include:
    category (work, home, other)
    difficulty (easy, doable, challenging, hard)
    priority (want, should must)
    interest (fun, meh, tedious)
    duration (15 minutes - 3 hours)
User settings include:
    default task options settings
    scheduling preferences, including:
        time allotted for tasks each day
        how many difficult and tedious task to include max
        whether to include a fun task whenever possible
List view features:
    sorting and filtering by task options, due date, and completion status
    adding a task to schedule
    marking a task complete
    editing task details
    deleting task from list
Automatic scheduler
    takes user settings and task details into account to schedule your daily tasks
    tasks that are due within a day (or overdue) are always added
    remaining tasks are sorted by due date and priority and added if time allows
    difficulty and interest settings are taken into account when scheduling
    if a task takes up all the allotted time, the user has an option to schedule it or not
    tasks can be removed from daily schedule and schedule updated
    tasks can be added to daily schedule from list view

## Planned Features
    recurring tasks
    scheduled appointments
    add your own category
    persist and server support
    splash screen and icon
    more detailed testing for scheduling algorithm
    improved ui on task list filters/sort menu
    accessibility improvements


## Acknowledgments
Styling and animation contributions by @marinamuse
Rating component adapted from https://github.com/Monte9/react-native-ratings

# Status
in progress
