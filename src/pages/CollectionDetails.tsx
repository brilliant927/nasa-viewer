import React, { useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import queryString from 'query-string';
import { apiService } from '../services/api.service';
import Spinner from '../components/ui-kit/spinner';
import { Collection } from "../types/collection";

export default function CollectionDetails() {
  const { id } = queryString.parse(window.location.search);
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState<Array<Collection>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const searchUrl = ('nasa_id=' + id + '&media_type=image');
    setIsLoading(true);
    apiService.collections(searchUrl)
    .then(({ collection }) => {
      setCollections(collection.items);
    })
    .finally(() => setIsLoading(false));
  }, [id]); 
  const handleBackButton = () => {
    navigate(-1);
  }
  return (
    <>
        {
          collections.length === 0 ? <div>Nothing to display</div> : 
            collections.map((collection) =>  {
              return (
                <div className="m-6">
                  <div className="mb-6 flex">
                    <div className="text-center w-full">
                      <p className="font-bold text-2xl">
                      {collection.data[0].title}
                    </p>
                    </div>
                      <button onClick={handleBackButton} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Back
                      </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 text-slate-900">
                    <div className="flex flex-col m-2 space-y-2">
                      {
                        collection.data[0].secondary_creator && 
                        <div>
                          <p className="font-bold">Photographer</p> 
                          {collection.data[0].secondary_creator}
                        </div>
                      }
                      {
                        collection.data[0].description && 
                        <div>
                          <p className="font-bold">Description</p> 
                          {collection.data[0].description}
                        </div>
                      }
                      {
                        collection.data[0].keywords && 
                        <div>
                          <p className="font-bold">Keywords</p> 
                          {
                            collection.data[0].keywords.map((keyword, index) => {
                              return (<div className="m-2" key={index}> {keyword} </div>)
                            })
                          }
                        </div>
                      }
                      {
                        collection.data[0].date_created && 
                        <div>
                          <p className="font-bold">Created Date</p> 
                          {collection.data[0].date_created}
                        </div>
                      }
                    </div>
                    <div>
                    {
                      collection.links && collection.links.map((link) => {
                        if(link.render === 'image') {
                          return (<div className="h-full w-full flex justify-center">
                            <img className="h-full" src={link.href} alt="Preview"/></div>)
                        } else return ('');
                      })
                    }
                    </div>
                  </div>
                </div>
              )
            })
           
        }
       {isLoading && <Spinner isLoading={isLoading}/>}
    </>
  );
}