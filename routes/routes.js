const { Router } =          require("express");
const router =              Router();
const usersHandler =        require("../components/users/usersHandlers/usersHandler");

module.exports = (app) => {
  
  app.use("/", router);


  router.get('/info', usersHandler.getArgvInfo)
  router.get('/api/randoms', usersHandler.getRandoms)
  

};

