import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, PlayCircle } from 'lucide-react';
import api from './services/api';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error("Erro ao buscar detalhes:", err);
      }
    };
    fetchData();
  }, [id]);

  if (!movie) return <div className="p-20 text-primary flex items-center gap-4"><PlayCircle className="animate-pulse"/> Carregando...</div>;

  return (
    <div className="min-h-screen bg-background p-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-secondary hover:text-primary mb-12 cursor-pointer transition-colors">
        <ArrowLeft size={20} /> Voltar
      </button>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 mb-16">
          <img src={movie.Poster} className="w-full md:w-80 rounded-[2.5rem] shadow-2xl border border-white/5 object-cover h-[450px]" alt={movie.Title} />
          
          <div className="flex-1">
            <h1 className="text-6xl font-black text-white mb-6 tracking-tighter">{movie.Title}</h1>
            <div className="flex gap-6 mb-8 items-center">
               <span className="flex items-center gap-2 text-primary font-bold text-xl"><Star size={24} fill="currentColor"/> {movie.imdbRating}</span>
               <span className="flex items-center gap-2 text-secondary font-medium text-lg"><Calendar size={22}/> {movie.Year}</span>
               <span className="px-3 py-1 rounded-full border border-accent text-accent text-xs uppercase font-bold">{movie.Genre}</span>
            </div>
            <p className="text-text-main text-xl leading-relaxed mb-10 opacity-80">{movie.Plot}</p>
            <div className="grid grid-cols-1 gap-4 text-lg">
               <p><span className="text-primary font-bold">Diretor:</span> <span className="text-secondary">{movie.Director}</span></p>
               <p><span className="text-primary font-bold">Atores:</span> <span className="text-secondary">{movie.Actors}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MovieDetails;