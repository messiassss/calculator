class CalcController{
    constructor(){
        this._lastOperator = '';
        this._lastNumber = '';
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora"); 
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize(){
        this.setDisplayDateTime();
        setInterval(()=>{
            this.setDisplayDateTime();
        },1000);
        this.setLastResultToDisplay();
    }
    

    setDisplayDateTime(){
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day: "2-digit",
            month: "long",
            year: "numeric"
        });        
    }


    initButtonsEvents(){
       
        let buttons = document.querySelectorAll("#buttons > g, #parts > g")
            
        buttons.forEach((btn,index)=>{

            
            this.addEventListenerAll(btn,"click drag", (e)=>{
               let txtbtn = btn.className.baseVal.replace("btn-","");
               this.execBtn(txtbtn);
            })

            this.addEventListenerAll(btn, "mouseover mouseup mousedown",()=>{
                btn.style.cursor = "pointer"
            })
        
        })
    }

    addEventListenerAll(element, events, fn){
        events.split(" ").forEach(event =>{
            element.addEventListener(event,fn,false)
        })
    }


    clearAll(){
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';
        this.setLastResultToDisplay();
    }
    clearEntry(){
        this._lastNumber = '';
        this._lastOperator = '';
        this._operation.pop();
        this.setLastResultToDisplay();
    }

    setError(){
        this.displayCalc = "ERROR";
    }

    getLastOperation(){
        return this._operation[this._operation.length-1]
    }


    isOperator(value){
        return (['+','-','*','%','/'].indexOf(value)>-1)
    }

    setLastOperation(value){
        this._operation[this._operation.length-1] = value;
    }

    pushOperation(value){
        this._operation.push(value);

        if(this._operation.length > 3){
            this.calc()
        }

    }

    getResult(){
        return eval(this._operation.join(""));
    }

    calc(){

        let last = '';
        
        if(this._operation.length > 3){
            last = this._operation.pop();
            this._lastOperator = last;

            let result = this.getResult();
            this._lastNumber = result
        }else if(this._operation.length == 2){

            this._operation.push(this._lastNumber);
        }else if(this._operation.length ==3){
             
            this._lastNumber = this.getLastOperation();;

            this._lastOperator = this.getLastOperator();
        }
        else{
            this._operation.push(this._lastOperator);
            this._operation.push(this._lastNumber);
        }
        
        let result = this.getResult();


        if(last == "%"){
            result /= 100;
            this._operation = [result];         
        }
        else{
            this._operation = [result];

            if(last) this._operation.push(last);
        }


        
        this.setLastResultToDisplay();
        console.log(this._operation+""+" "+this._lastNumber+" "+this._lastOperator);
    }

    getLastOperator(){
        for(let i = this._operation.length-1; i >=0 ; i--){
           
            if(this.isOperator(this._operation[i])){
               return this._operation[i];
            }
           
        }
    }

    setLastResultToDisplay(){
       
        let lastNumber;

        for(let i = this._operation.length-1; i >=0 ; i--){
           
            if(!this.isOperator(this._operation[i])){
                lastNumber = this._operation[i];
            }
            break;
        }
        
        if(!lastNumber) lastNumber = (!this._lastNumber ? 0 : this._lastNumber);

        this.displayCalc = lastNumber;
        
    }
    addOperation(value){
      
        if(isNaN(this.getLastOperation())){

            if(this.isOperator(value)){
                this.setLastOperation(value);
            }
            else if(isNaN(value)){

            }else{
                this.pushOperation(value);
                this.setLastResultToDisplay();
            }

        }else{
            if(this.isOperator(value)){
                this.pushOperation(value)     
            }
            else{
                let newValue = this.getLastOperation().toString()+value.toString();
                this.setLastOperation(parseInt(newValue));
            }
            }
            
        this.setLastResultToDisplay();
        
    }
    execBtn(value){
        switch(value){

            case 'ac':
                this.clearAll();
            break;
            case 'ce':
                this.clearEntry();
            break;
            case 'soma':
                this.addOperation("+");
            break;
            case 'subtracao':
                this.addOperation("-");
            break; 
            case 'divisao':
                this.addOperation("/");
            break; 
            case 'multiplicacao':
                this.addOperation("*");
            break; 
            case 'porcento':
                this.addOperation("%");
            break; 
            case 'igual':
                this.calc();
            break; 
            case 'pontos':
                this.addOperation(".");
            break; 
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            this.addOperation(parseInt(value));
            break

            default:
                this.setError();
                break;

        }
    }
    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        this._dateEl.innerHTML = value;
    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }


    get currentDate(){ 
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }

}