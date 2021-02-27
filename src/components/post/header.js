import { Link } from 'react-router-dom';
import addDefaultImage from '../../utils/addDefaultImage';

export default function Header({ username }) {
  return (
    <div className="flex border-b h-4 p-4 py-8">
      <Link to={`/p/${username}`} className="flex items-center">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt={`${username}`}
          className="rounded-full h-8 w-8 flex mr-3"
          onError={addDefaultImage}
        />
        <p className="font-bold">{username}</p>
      </Link>
    </div>
  );
}
