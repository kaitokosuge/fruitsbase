import React from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from './../../components/ui/drawer';
import Image from 'next/image';

export default function QuizViews() {
    const dummy = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ];
    return (
        <div>
            {dummy.map((item) => (
                <div key={item} className="mt-5">
                    <Drawer>
                        <DrawerTrigger className="w-[80%] mx-auto bg-white text-left px-5 rounded-md flex justify-between items-center">
                            <div className="flex items-center w-[50%]">
                                <div className="min-w-[30px] h-[30px]">
                                    <Image
                                        src="/coverage.png"
                                        className="block h-full w-full rounded-full"
                                        alt="profile"
                                        width={30}
                                        height={30}
                                    />
                                </div>
                                <p className="ml-3 overflow-scroll whitespace-nowrap py-5">
                                    mswのSetupServerの使い方として適切なものはどれ？mswのSetupServerの使い方として適切なものはどれ？mswのSetupServerの使い方として適切なものはどれ？
                                </p>
                            </div>
                            <div className="w-[40%] flex items-center">
                                <p className="text-xs">2023/11/09</p>
                                <div className="w-[25px] h-[25px] bg-yellow-400 ml-5 rounded-[5px]"></div>
                                <p className="ml-1 text-[14px] font-bold">
                                    JavaScript
                                </p>
                                <div className="w-[25px] h-[25px] bg-blue-500 ml-5 rounded-[5px]"></div>
                                <p className="ml-1 text-[14px] font-bold">
                                    TypeScript
                                </p>
                            </div>
                        </DrawerTrigger>
                        <DrawerContent className="min-h-[85%] max-h-[95%] md:px-10 bg-[#F0F0F0]">
                            <DrawerHeader className="xl:w-[80%] md:w-[95%] w-[100%] mx-auto">
                                <DrawerTitle className="md:text-[22px] text-[16px] mt-10 text-left">
                                    mswのSetupServerの使い方として適切なものはどれ？
                                </DrawerTitle>
                                <DrawerDescription></DrawerDescription>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center"></div>
                                    <div>
                                        <button className="bg-[#3333] text-white px-5 py-1 block rounded-md font-bold">
                                            解答する
                                        </button>
                                    </div>
                                </div>
                                <div className="grid mt-2 lg:grid-cols-2 grid-cols-1 gap-4">
                                    <button className="border border-[#c9c9c9] text-left relative rounded-md">
                                        <div className="absolute left-0 top-0 bg-none rounded-md bg-option-btn-left"></div>
                                        <div className="absolute right-0 rounded-md top-0 bg-option-btn-right"></div>
                                        <div className="overflow-scroll whitespace-nowrap py-5 pl-5 pr-5">
                                            あerverからのrequestのインターセプトserverからのrequestのインターセプトserverからのrequestのインターセプト
                                        </div>
                                    </button>
                                    <button className="border border-[#c9c9c9] text-left relative rounded-md">
                                        <div className="absolute left-0 top-0 bg-none rounded-md bg-option-btn-left"></div>
                                        <div className="absolute right-0 rounded-md top-0 bg-option-btn-right"></div>
                                        <div className="overflow-scroll whitespace-nowrap py-5 pl-5 pr-5">
                                            あerverからのrequestのインターセプトserverからのrequestのインターセプトserverからのrequestのインターセプト
                                        </div>
                                    </button>
                                    <button className="border border-[#c9c9c9] text-left relative rounded-md">
                                        <div className="absolute left-0 top-0 bg-none rounded-md bg-option-btn-left"></div>
                                        <div className="absolute right-0 rounded-md top-0 bg-option-btn-right"></div>
                                        <div className="overflow-scroll whitespace-nowrap py-5 pl-5 pr-5">
                                            あerverからのrequestのインターセプトserverからのrequestのインターセプトserverからのrequestのインターセプト
                                        </div>
                                    </button>
                                </div>
                            </DrawerHeader>
                            <DrawerFooter>
                                <DrawerClose>閉じる</DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
            ))}
        </div>
    );
}
