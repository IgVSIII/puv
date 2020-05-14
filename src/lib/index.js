import Unsplash from 'unsplash-js';


const unsplash = new Unsplash({
    accessKey: "50ed87a710c800dc9bbe33a4a18ae37cb7d51679978da874ce6037c158b74af3",
    secret: "2728066a53a960c2899775cc7e9731282b5cf861111d88a595d0894e3c2024cb",
    callbackUrl: "https://igvsiii.github.io/puv/"
});

export const authenticationUrl = unsplash.auth.getAuthenticationUrl([
    "public",
    "read_user",
    "read_photos",
    "write_likes"
  ]);

export const setAccessTokenUnplash = (code, action) => {
    unsplash.auth.userAuthentication(code)
        .then(res => res.json())
        .then(json => {
                action(json.access_token);
            }
        );
};



export const listPhoto = (start, end, token) => {
    unsplash.auth.setBearerToken(token);
    return unsplash.photos.listPhotos(start, end, "latest")
        .then(res => res.json());
};

export const likePhotoLib = (id, token) => {
    unsplash.auth.setBearerToken(token);
    unsplash.photos.likePhoto(id)
        .then(res => res.json())
        .then(json => {
            //console.log(json);
        });
};

export const unlikePhotoLib = (id, token) => {
    unsplash.auth.setBearerToken(token);
    unsplash.photos.unlikePhoto(id)
        .then(res => res.json())
        .then(json => {
            //console.log(json);
        });
};