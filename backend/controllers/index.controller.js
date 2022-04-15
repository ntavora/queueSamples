exports.login = (req, res) => {
    var async = require('async');

    var taskList = [{ name: 'task1' },
        { name: 'task2' }, { name: 'task3' },
        { name: 'task4' },
    ]
    var taskQueue = async.queue(function(task, callback) {
        console.log("Performing task " + task.name + "...");
        // console.log("Waiting to be processed: ", task.Queue.length());
        console.log("________________________________________________");
        setTimeout(function() {
            callback();
        }, 1000)
    }, 1);

    taskQueue.drain = function() {
        console.log('All times ahve been processed.')
    };

    taskList.forEach(function(task) {
        taskQueue.push({ name: task }, function(err) {
            if (err) {
                console.log(err);
            }
        });
    });

    taskQueue.unshift({ name: 'Most important task' }, function(err) {
        if (err) {
            console.log(err);
        }
    });
    res.send("hello");
};

exports.logout = (req) => {
    req.session.token = '';
};