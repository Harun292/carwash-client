const getEnvVars = ()=> {
    
        return {
          API_URL: 'http://localhost:4000/api/v1',
        };
  };
  
  const { API_URL } = getEnvVars();
  
  export { API_URL };
  