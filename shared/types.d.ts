// export type Language = 'English' | 'Frenc


export type Movie =   {
  PK : string,
  SK : string,
  id: number,
  backdrop_path: string,
  genre_ids: number[ ],
  original_language: string,
  original_title: string,
  adult: boolean,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}

  export type MovieCast = {
    PK : string,
    SK : string,
    movieId: number;
    actorId: number;
    actorName: string;
    roleName: string;
    roleDescription: string;
 };
  // Used to validate the query string of HTTP GET requests
  export type MovieCastMemberQueryParams = {
    PK : string,
    SK : string,
    movieId: string;
    actorName?: string;
    roleName?: string
 }


 export type Award = {
  PK : string,
  SK : string,
  awardId: number;
  body: string;
  category: string;
  year: number;
 }

   export type SignUpBody = {
  username: string;
  password: string;
  email: string;
};

   export type ConfirmSignUpBody = {
  username: string;
  code: string;
};


   export type SignInBody = {
  username: string;
  password: string;
};

   export type SignOutBody = {
//empty becasue you dont need anything for signing out 
};
 

