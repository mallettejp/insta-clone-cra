import { getTime } from 'date-fns';
import React, { useState, useContext, useEffect } from 'react';
import { getUserByUserId, getUserFollowedPhotos } from '../services/firebase';
import UserContext from '../context/user';

export default function useFollowedUsersPhotos() {
  const [photos, setPhotos] = useState(null);
  // object destructured, assigned to userId, and set default of ''
  const {
    user: { uid: userId = '' },
  } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      const followingUserIds = await getUserByUserId(userId);

      if (followingUserIds && followingUserIds[0].following.length > 0) {
        const followedUserPhotos = await getUserFollowedPhotos(
          userId,
          followingUserIds[0].following
        );

        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    }

    getTimelinePhotos();
  }, [userId]);

  return { photos };
}
