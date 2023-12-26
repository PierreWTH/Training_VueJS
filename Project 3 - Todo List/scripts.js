const toDoApp = {

    data() {
        return {
            tasks: [],
            newTask: {
                isDone: false
            }
        }
    },
    methods: {
        addTask: function() {
            if(this.newTask.label){
                this.tasks.push(this.newTask);
                this.newTask = {};
                localStorage.setItem("tasks", JSON.stringify(this.tasks))
            }
            else {
                alert("Please enter a name.")
            }
        },
        storeTasks(){
        localStorage.setItem("tasks", JSON.stringify(this.tasks))
        }
    },
    created() {
        this.tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : this.tasks;
    },
};

Vue.createApp(toDoApp).mount('#app');