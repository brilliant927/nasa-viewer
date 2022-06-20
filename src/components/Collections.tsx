import React from 'react';
import CollectionCard from './CollectionCard';
import { Collection } from "../types/collection";

interface IProps {
  collections: Array<Collection>;
}

export default function Collections({ collections }: IProps) {

  return (
    <div>
      {
        collections.length === 0 ? <div>Nothing to display</div> : 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {
            collections.map((collection) =>  {
              return <CollectionCard collection={collection} key={collection.data[0].nasa_id}/>
            })
          }
        </div>
      }
    </div>
  ); 
}

