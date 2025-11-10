import { marshall } from "@aws-sdk/util-dynamodb";
import { Movie, MovieCast, Award } from "./types";

type Entity = Movie | MovieCast| Award;  // NEW
export const generateItem = (entity: Entity) => {
  return {
    PutRequest: {
      Item: marshall(entity),
 },
 };
};

export const generateBatch = (data: Entity[]) => {
  return data.map((e) => {
    return generateItem(e);
 });
};


export const PK ={
  movie:(id: string) => "m.${id}",
  cast:(movieId: string) => "c.${movieId}",
  award:(awardId: string) => "w.${awardId}",
};


export const SK ={
  movieDefault:() => "",
  castActor:(actorId: string) => String(actorId),
  awardBody:(body: string) => body,
};

