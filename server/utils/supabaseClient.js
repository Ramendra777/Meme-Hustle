const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const Leaderboard = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const fetchTopMemes = async () => {
      const { data, error } = await supabase
        .from('memes')
        .select('*')
        .order('upvotes', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching leaderboard:', error);
      } else {
        setMemes(data);
      }
    };

    fetchTopMemes();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4 neon-text">🏆 Leaderboard</h1>
      <ul>
        {memes.map((meme, index) => (
          <li key={meme.id} className="mb-3 p-3 bg-black bg-opacity-20 rounded-lg">
            <strong className="text-pink-400">#{index + 1}</strong> {meme.title} – <span className="text-yellow-300">{meme.upvotes} upvotes</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;

module.exports = { supabase };
