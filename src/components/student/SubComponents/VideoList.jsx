import React from "react";
import VIdeoListVideo from "./VIdeoListVideo";

function VideoList() {
  return (
    <div class="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      <VIdeoListVideo />
      <VIdeoListVideo />
      <VIdeoListVideo />
    </div>
  );
}

export default VideoList;
