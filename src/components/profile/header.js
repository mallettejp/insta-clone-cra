import React, { useState, useEffect } from 'react';
import useUser from '../../hooks/useUser';
import Skeleton from 'react-loading-skeleton';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';
import addDefaultImage from '../../utils/addDefaultImage';

export default function Header({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    following = [],
  },
  username,
}) {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollowState = user.username && user.username !== username; // returns true if user is not on their own profile page

  // TODO: debouncing requests
  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(isFollowing);
    };
    // only run if user is logged in and on a profile page
    if (user.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.username, profileUserId]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt={`${username}`}
          className="rounded-full h-40 w-40 flex"
          onError={addDefaultImage}
        />
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{username}</p>
          {activeBtnFollowState && (
            <button
              className="bg-blue-500 font-bold text-sm rounded text-white w-20 h-8"
              type="button"
              onClick={handleToggleFollow}
            >
              {isFollowingProfile ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {followerCount === undefined || following === undefined ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span>{' '}
                {photosCount === 1 ? 'photo' : 'photos'}
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>{' '}
                {followerCount === 1 ? 'follower' : 'followers'}
              </p>
              <p className="mr-10">
                <span className="font-bold">{following.length}</span> following
              </p>
            </>
          )}
        </div>
        <div className="container flex mt-4">
          <p className="font-medium">
            {fullName === undefined ? (
              <Skeleton count={1} height={24} />
            ) : (
              fullName
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
