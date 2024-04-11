// import * as React from "react";
// import securityGuard from "@/assets/cops.jpg";
// import flowerPic from "@/assets/Birthday-Flowers-Colors.jpg";
// import sanitation from "@/assets/Healthcare+Facility+Cleaning-1920w.webp";
// import {Button} from "@/components/ui/button.tsx";
//
// interface slideProp {
//     slide: string;
// }
//
// export function HomeCarouselSlide({slide}: slideProp) {
//
//     return (
//         <>
//             {slide === "security" &&
//                 <div className="SecurityRequest w-full h-[400px] absolute overflow-hidden">
//                     <img className="BirthdayFlowersColors1 absolute inset-0 w-full h-[400px] object-cover object-top"
//                          src={securityGuard} alt={"Security Guard"}/>
//                     <div
//                         className="ProtectingYourPeaceOfMindOneRequestAtATime h-40 right-[5vh] bottom-[15vh] absolute text-right">
//                         <span className="text-white text-[64px] font-black font-['League Spartan']">Protecting Your Peace of Mind...<br/></span>
//                         <span
//                             className="text-white text-5xl font-black font-['League Spartan']">One Request at a Time<br/><br/></span>
//                         <Button variant={"default"} type={"button"} size={"lg"} className={"text-xl"}>
//                             <a
//                                 href="/service-requests"
//                                 className="flex items-center gap-2 text-lg font-semibold md:text-base"
//                             >
//                                 Make a Security Request
//                             </a>
//                         </Button>
//                     </div>
//                 </div>
//             }
//             {slide === "flower" &&
//                 <div className="SecurityRequest w-full h-[400px] absolute overflow-hidden">
//                     <img className="BirthdayFlowersColors1 absolute inset-0 w-full h-[400px] object-cover object-top"
//                          src={flowerPic} alt={"Security Guard"}/>
//                     <div
//                         className="ProtectingYourPeaceOfMindOneRequestAtATime h-40 right-[5vh] bottom-[5vh] absolute text-right">
//                         <span className="text-cyan-600 text-[64px] font-black font-['League Spartan']">Sending Flowers to a Loved One?<br/></span>
//                         <Button variant={"default"} type={"button"} size={"lg"} className={"text-xl"}>
//                             <a
//                                 href="/service-requests"
//                                 className="flex items-center gap-2 text-lg font-semibold md:text-base"
//                             >
//                                 Request Flowers
//                             </a>
//                         </Button>
//                     </div>
//                 </div>
//             }
//             {slide === "sanitation" &&
//                 <div className="SecurityRequest w-full h-[400px] absolute overflow-hidden">
//                     <img className="BirthdayFlowersColors1 absolute inset-0 w-full h-[400px] object-cover object-bottom"
//                          src={sanitation} alt={"Security Guard"}/>
//                     <div
//                         className="ProtectingYourPeaceOfMindOneRequestAtATime h-40 right-[5vh] bottom-[8vh] absolute text-right">
//                         <span className="text-black text-[48px] font-black font-['League Spartan']">Cleanliness is Our Commitment,<br/>Your Health is Our Priority<br/></span>
//                         <Button variant={"default"} type={"button"} size={"lg"} className={"text-xl"}>
//                             <a
//                                 href="/service-requests"
//                                 className="flex items-center gap-2 text-lg font-semibold md:text-base"
//                             >
//                                 Make a Sanitation Request
//                             </a>
//                         </Button>
//                     </div>
//                 </div>
//             }
//         </>
//     );
// }
