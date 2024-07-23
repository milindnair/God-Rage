"use client";
import Image from "next/image";
import React, { useEffect, useId, useReducer, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Checkbox } from "@nextui-org/react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


export function ExpandableCardDemo({ documents, selectedDocuments, setSelectedDocuments }) {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();
  const [childSelectedDocs, setchildSelectedDocs] = useState([]);

  console.log(`ExpandableCardDemo1: ${documents}`);


  useEffect(() => {
    setchildSelectedDocs(selectedDocuments);
  }, [selectedDocuments])

  useEffect(() => {
    console.log("ExpandableCardDemo", childSelectedDocs);
  }, [childSelectedDocs]);


  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));








  const handleCheckboxChange = (doc) => {
    setSelectedDocuments((prev) => {
      const isSelected = prev.some(d => d.fileName === doc.fileName);
      if (isSelected) {
        return prev.filter((d) => d.fileName !== doc.fileName);
      } else {
        return [...prev, doc];
      }
    });
  };



  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length <= wordLimit) {
      return description;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('hello world');
      toast('Copied!',{containerId: 'container C'})
    })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="no-scrollbar fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            {/* this is open kiya hua */}
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="no-scrollbar w-full p-2 max-w-[500px]  md:h-fit  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              {/* <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div> */}

              <div className="pt-5">
                <div className="flex justify-between items-start p-4">
                  <div className="mt-2">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-lg font-  text-neutral-700 dark:text-neutral-200 poppins"
                    >
                      {active.title}
                    </motion.h3>
                    {/* <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {truncateDescription(active.description, 5)}
                    </motion.p> */}
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    onClick={() => handleCopy(active.content)}

                    // href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm   rounded-full font-bold bg-green-500 text-white cursor-pointer "
                  >
                    {"Copy"}
                  </motion.a>
                </div>
                <div className="pt- relative pb-10 px-4">
                  <motion.div
                    className="no-scrollbar text-neutral-600 text-xs font- md:text-sm lg:text-base md:h-fit pb-30 flex flex-col items-start gap-4 dark:text-neutral-400"
                    style={{ maxHeight: '75vh', overflowY: 'auto' }} // Added styles here
                  >
                    {typeof active.content === "function" ? active.content() : active.content}
                  </motion.div>



                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* this is the list */}

      <ul className="max-w-2xl mx-auto w-full gap-4">
        {documents.map((card, index) => (
          <div key={`card-${card.title}-${id}`} className="flex flex-row">
            <Checkbox
              key={card.fileName} // or another unique attribute
              checked={childSelectedDocs.some(doc => doc.fileName === card.fileName)
              }
              defaultChecked={false}
              onChange={(e) => {
                e.stopPropagation();
                handleCheckboxChange(card);
              }}
              className="ml-1"
            />


            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={`card-${card.title}-${id}`}
              onClick={() => setActive(card)}
              className="py-3 pl-3 pr-1 flex flex-col md:flex-row w-full font-  justify-between items-center hover:text-black hover:bg-white/10 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
            >
              <div className="flex gap- flex-col md:flex-row ">
                {/* <motion.div layoutId={`image-${card.title}-${id}`}> */}
                {/* <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                /> */}
                {/* </motion.div> */}
                <div className="">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="text-md text-white dark:text-neutral-200 poppins"
                  >
                    {card.title}
                  </motion.h3>
                  {/* <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  {card.description}
                </motion.p> */}
                </div>
              </div>
              <motion.button
                layoutId={`button-${card.title}-${id}`}
                className="px-4 py-2 text-sm rounded-full nunito_sans font-bold bg-gray-100 hover:bg-purple-500 hover:text-white text-black ml-2 mt-4 md:mt-0"
              >
                {"View"}
              </motion.button>

            </motion.div>
            

          </div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};


