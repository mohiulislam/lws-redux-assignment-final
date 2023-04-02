import React from "react";
import { useGetVideosQuery } from "../../../features/video/videoApi";
import MainLayout from "../../layouts/MainLayout";
import VideoList from "../SubComponents/VideoList";

function CoursePlayer({}) {
  const { data: videos, isLoading, isError, error } = useGetVideosQuery();
  console.log(videos ? videos[0].title : null);

  return (
    <MainLayout>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <div className="col-span-full w-full space-y-8 lg:col-span-2">
              <iframe
                width="100%"
                className="aspect-video"
                src={videos ? videos[0].url : null}
                title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              <div>
                <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                  {videos ? videos[0].title : null}
                </h1>
                <h2 className="pb-4 text-sm leading-[1.7142857] text-slate-400">
                  Uploaded on 23 February 2020
                </h2>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                  >
                    এসাইনমেন্ট
                  </a>

                  <a
                    href="./Quiz.html"
                    className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                  >
                    কুইজে অংশগ্রহণ করুন
                  </a>
                </div>
                <p className="mt-4 text-sm text-slate-400 leading-6">
                  {videos ? videos[0].description : null}
                </p>
              </div>
            </div>
            <VideoList />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default CoursePlayer;
