import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Skelton from 'react-loading-skeleton';
import addDefaultImage from '../../utils/addDefaultImage';

const User = ({ username, fullName }) =>
  !username || !fullName ? (
    <Skelton count={1} height={61} />
  ) : (
    <Link
      to={`/p/${username}`}
      className="grid grid-cols-4 gap-4 mb-4 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt="My profile"
          className="rounded-full w-16 mr-3"
          onError={addDefaultImage}
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );

export default memo(User);
