import React, { useReducer, useEffect } from 'react';
import Header from './header';
import Photos from './photos';
import {
  getUserByUsername,
  getUserPhotosByUsername,
} from '../../services/firebase';

const reducer = (state, newState) => ({ ...state, ...newState });
const initialState = {
  profile: {},
  photosCollection: [],
  followerCount: 0,
};

export default function Profile({ username }) {
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    // TODO: think about caching here in localstorage so we don't make a network call we have already made previously (task)
    async function getProfileInfoAndPhotos() {
      const [{ ...user }] = await getUserByUsername(username);
      const photos = await getUserPhotosByUsername(username);

      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    }
    getProfileInfoAndPhotos();
  }, [username]);

  useEffect(() => {
    document.title = `${username}'s profile`;
  });

  return (
    <>
      <Header
        photosCount={photosCollection.length}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
        username={username}
      />
      <Photos photos={photosCollection} />
    </>
  );
}
