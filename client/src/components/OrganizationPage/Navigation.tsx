import React, { useState, useRef, useEffect } from 'react';

export enum UserPagesEnum {
    Worspace = 0,
    UserManagement,
    Projects,
    Billing
}

const tabs = [
    { id: UserPagesEnum.Worspace, label: 'Workspace' },
    { id: UserPagesEnum.UserManagement, label: 'User management' },
    { id: UserPagesEnum.Projects, label: 'Projects' },
    { id: UserPagesEnum.Billing, label: 'Billing'}
];


interface IProps {
    activeTab: number,
    setActiveTab: React.Dispatch<any>
}


const Navigation: React.FC<IProps> = ({activeTab, setActiveTab}) => {
    const [indicatorPosition, setIndicatorPosition] = useState<number>(0);
    const [indicatorWidth, setIndicatorWidth] = useState<number>(0);
    const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const activeTabRef = tabRefs.current[activeTab - 1];
        const containerRect = containerRef.current?.getBoundingClientRect();

        if (activeTabRef && containerRect) {
            const rect: DOMRect = activeTabRef.getBoundingClientRect();
            const containerLeft: number = containerRect.left;
            const tabLeft: number = rect.left;
            const tabWidth: number = rect.width;

            const tabCenter: number = tabLeft + tabWidth / 2 - 15;

            const indicatorLeft: number = tabCenter - containerLeft - indicatorWidth / 2;

            setIndicatorPosition(indicatorLeft);
            setIndicatorWidth(tabWidth);
        }
    }, [activeTab, indicatorWidth]);

    return (
        <>
            <div className="bg-white w-full">
                <div className="flex space-x-4 border-b relative" ref={containerRef}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            // @ts-ignore
                            ref={el => tabRefs.current[tab.id - 1] = el}
                            className={`pt-[20px] pb-[16px] px-4 focus:outline-none transition-colors duration-300 ease-in-out ${activeTab === tab.id ? 'text-orange-brand' : 'text-gray-500'}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                    <div
                        className="absolute bottom-0 h-0.5 bg-orange-brand transition-all duration-300 ease-in-out rounded-full w-full"
                        style={{ left: indicatorPosition, width: indicatorWidth }}
                    ></div>
                </div>
            </div>
        </>
    );
};

export default Navigation;