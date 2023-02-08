import type { TObject, Static } from '@feathersjs/typebox'

export function toLowerCaseProperty<T extends TObject>(rawData: any, schema: T): Static<typeof schema> {
  // console.log(rawData);
  // console.log(schema);

  const keys = Object.keys(rawData);

  // console.log(rawData["ID"])

  const returnData: Record<string, any> = {};

  keys.forEach((key) => {
    const lowerKey = key.toLowerCase();

    if(schema.properties.hasOwnProperty(lowerKey)){
      returnData[lowerKey] = rawData[key];
    }
  });
  return returnData;
}