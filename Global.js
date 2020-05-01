export default class Global {

    static instance = null;
    logado = false;

    constructor(){}

    /**
     * Obtem instância do singleton
     * @returns {Global}
     */
    static getInstance() {
        if(this.instance == null){
            this.instance = new Global();
        }
        return this.instance;
    }

    setLogado(logado){
        this.logado = logado;
    }
    isLogado(){
        return this.logado;
    }

    /*
    Observer de usuários
    */

   observers = [];

   /**
    * Adiciona observer de usuários
    * @param {String} id 
    * @param {(usuario:Object)=>void} observer 
    */
   addObserverUsuario(id, observer){
       this.observers.push(
           {
               id: id,
               observer: observer
           }
       )
   }

   /**
    * Remove observer de usuários
    * @param {String} id 
    */
   removeObserverUsuario(id){
       for(let i=0; i<this.observers.length; i++){
           if(this.observers[i].id == id){
               this.observers.splice(i, 1);
               break;
           }
       }
   }

   /**
    * Atualiza todos os observers de usuário
    * @param {Object} usuario 
    */
   updateObserverUsuario(usuario){
       for(let i=0; i<this.observers.length; i++){
           this.observers[i].observer(usuario);
       }
   }
   
}