import React, {useEffect,useState} from "react";
import api from './services/api';
import "./styles.css";

function App() {
    const [repositories,setrepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response => {
      setrepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response =await api.post('repositories',{
      title:'Alisson',url:'http://github.com/alissonjra',techs:['Node','React']
    })
    setrepositories([...repositories,response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const newRepositories = repositories.filter(repository => repository.id !== id)
    setrepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
          {repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}         
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
