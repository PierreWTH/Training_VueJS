tasks = [
    {
        label: 'Lear HTML, CSS & Javascript',
        isDone:false
    },
    {
        label: 'Improve skills in Vue.js',
        isDone: false
    },
]

const toDoApp = {

    data() {
        return {
            tasks: window.tasks,
            newTask: {}
        }
    },
    methods: {
        addTask: function() {
            if(this.newTask.label){
                this.newTask.isDone = false
                this.tasks.push(this.newTask);
                this.newTask = {};
            }
            else {
                alert("Please enter a name.")
            }
        },
        clearAll: function() {
            this.tasks = []
        }
    },
};

Vue.createApp(toDoApp).mount('#app');