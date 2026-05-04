import React, { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Home() {
  const [busca, setBusca] = useState('');
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  
  const [pagina, setPagina] = useState(1);
  const [temMais, setTemMais] = useState(false);
  const [pesquisaFeita, setPesquisaFeita] = useState(false);

  useEffect(() => {
    const carregarDestaques = async () => {
      setCarregando(true);
      const titulos = ["Full House", "Top Gun", "Breaking Bad", "The Notebook", "The Last: Naruto the Movie"];
      const listaResultados = [];
      for (const t of titulos) {
        try {
          const res = await api.get('/buscar', { params: { titulo: t } });
          if (res.data.Search && res.data.Search.length > 0) {
            listaResultados.push(res.data.Search[0]);
          }
          await new Promise(resolve => setTimeout(resolve, 300));
        } catch (error) {
          console.error("Erro ao carregar destaque:", t, error);
        }
      }
      setFilmes(listaResultados);
      setCarregando(false);
    };
    carregarDestaques();
  }, []);

  const realizarBusca = async (novaPagina = 1) => {
    if (busca.trim() === '') return;
    
    setCarregando(true);
    setPesquisaFeita(true);

    try {
      const response = await api.get('/buscar', { 
        params: { titulo: busca, pagina: novaPagina } 
      });
      
      const resultados = response.data.Search || [];
      
      if (novaPagina === 1) {
        setFilmes(resultados);
      } else {
        setFilmes(prev => [...prev, ...resultados]);
      }

      setTemMais(resultados.length === 10);
      setPagina(novaPagina);
      
    } catch (error) {
      console.error("Erro ao buscar:", error);
    } finally {
      setCarregando(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      realizarBusca(1); 
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-center mb-16 mt-4">
        <div className="relative w-full max-w-3xl">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary" size={22} />
          <input 
            type="text" 
            className="w-full h-16 bg-surface rounded-full border border-white/5 pl-14 pr-6 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all text-white text-lg placeholder:text-secondary/40 shadow-2xl" 
            placeholder="Pesquisar" 
            value={busca} 
            onChange={(e) => setBusca(e.target.value)} 
            onKeyDown={handleKeyDown} 
          />
        </div>
      </div>

      {!busca && (
        <h2 className="text-sm font-black text-primary mb-8 ml-4 tracking-[0.3em] uppercase flex items-center gap-3">
          <span className="w-8 h-[2px] bg-accent"></span> Recomendados
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {filmes.map((filme) => (
          <Link to={`/detalhes/${filme.imdbID}`} key={filme.imdbID} className="group">
            <div className="bg-surface rounded-[2rem] overflow-hidden border border-white/5 hover:border-primary/40 transition-all shadow-2xl group-hover:-translate-y-3 duration-300">
              <img 
                src={filme.Poster !== 'N/A' ? filme.Poster : 'https://placeholder.com'} 
                className="w-full h-80 object-cover" 
                alt={filme.Title} 
              />
              <div className="p-5">
                <h3 className="font-bold text-text-main truncate mb-1">{filme.Title}</h3>
                <span className="text-accent text-sm font-medium">{filme.Year}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {carregando && (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-primary" size={48} />
        </div>
      )}

      {pesquisaFeita && filmes.length === 0 && !carregando && (
        <div className="text-center py-20">
          <p className="text-secondary text-xl">Ops! Não encontramos este título em nosso catálogo: "{busca}".</p>
        </div>
      )}

      {temMais && !carregando && busca && (
        <div className="flex justify-center mt-16 mb-10">
          <button 
            onClick={() => realizarBusca(pagina + 1)}
            className="px-10 py-4 rounded-full border border-primary text-primary font-bold hover:bg-primary hover:text-background transition-all shadow-lg hover:shadow-primary/20"
          >
            Carregar Mais Resultados
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;