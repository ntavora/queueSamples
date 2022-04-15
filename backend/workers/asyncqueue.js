var async = require('async');
var _ = require('loadash');
var taskList = _.times(10, _.uniqueId.bind(null, 'task_'));
var taskQueue = async.queue(function(task, callback) {
    console.log("Performing task " + task.name + "...");
    console.log("Waiting to be processed: ", task.Queue.length());
    console.log("________________________________________________");
    setTimeout(function() {
        callback();
    }, 1000)
}, 1);

taskQueue.drain = function() {
    console.log('All times ahve been processed.')
};

_.each(taskList, function(task) {
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