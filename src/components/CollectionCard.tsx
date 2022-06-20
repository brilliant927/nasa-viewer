import React from "react";
import { Link } from "react-router-dom";
import { Collection } from "../types/collection";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface IProps {
  collection: Collection;
}

export default function CollectionCard({ collection }: IProps) {

  return (
    <Link to={`/details?id=${collection.data[0].nasa_id}`}>
      <div className="h-60 m-1 rounded-md border-2 border-red-300 flex flex-col">
        {
          collection.links && collection.links.map((link) => {
            if(link.render === 'image') {
              return (<div className="flex-1 overflow-hidden">
                <div className="h-full w-full flex justify-center">
                 <LazyLoadImage 
                  wrapperClassName="w-full h-full"
                  className="object-cover w-full h-full"
                  alt={collection.data[0].title}
                  effect="blur"
                  src={link.href} /></div></div>)
            } else return ('');
          })
        }
        <div className="text-center px-1 truncate">{ collection.data[0].title }</div>
      </div>
    </Link>
  )
}