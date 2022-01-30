const cp=                    require('child_process')
const path=                  require('path')
const {calculateRandom}=     require('../usersServices/calculateRandom')
const { cpus }=              require('os')
const args=                  require('../../../utils/yargs')

var childProcessActive = false
let calculateRandomCP

const {mode, port} = args

class UsersHandler {
    
  async getArgvInfo(req, res, next) {

    const data = [
      
      {desc: 'Argumentos de entrada: ', value: process.argv.length === 2 ?  'no arguments on command line': process.argv[2]},
      {desc: 'Path de Ejecucion: ', value: process.execPath},
      {desc: 'Sistema operativo: ', value: process.platform},
      {desc: 'Version de Node: ', value: process.version},
      {desc: 'Uso de CPU: ', value: process.memoryUsage.rss()},
      {desc: 'Numero de CPUs: ', value: cpus().length},
      {desc: 'ID de Proceso: ', value:process.pid},
      {desc: 'Carpeta de Proyecto', value: process.cwd()},
    ];

    res.render('layouts/info', {data})
  }

  async getRandoms(req, res, next){
    
        const {cant} = req.query;
        
        if(!cant) cant=1000000;
        if(args.mode==='child' && !childProcessActive){
          
                
            calculateRandomCP = cp.fork(path.join(__dirname, '../usersServices/calculateRandom'))
            console.log(`este es el proceso lanzado de child_process ${calculateRandomCP.pid}`)          
            
            calculateRandomCP.on('message', response =>{
              res.send(response.data)
              calculateRandomCP.kill()
            })
      
            calculateRandomCP.send(cant)}
        
        else{
          
          if(args.mode!=='child') res.send(calculateRandom(cant))
          
          if(childProcessActive) calculateRandomCP.send(cant)
        }
}
}
module.exports = new UsersHandler();
