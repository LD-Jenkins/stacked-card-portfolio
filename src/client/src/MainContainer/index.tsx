import React, { useState } from 'react';
import './index.css';
import { Tab } from '../components/Tab';
import { Content } from '../components/Content';

const ANIMDUR = 500;
const ANIMFREQ = 10;
const TOTALANIMCYCLES = ANIMFREQ / ANIMDUR;
const ACTIVETABHEIGHT = 74;
const HIDTABMAXHEIGHT = 7;
const HIDTABHEIGHTDIFF = 1.25;
const HIDTABWIDTHDIFF = 5;

interface UrlProps {
  urlPath: string,
}

interface Tab {
  pageName: string,
  height: number,
  width: number,
  alpha: number,
  active: boolean,
}

export const Main: React.FC<UrlProps> = ({ urlPath }) => {

  const [isAnimating, setIsAnimating] = useState(false);
  const [tabs, setTabs] = useState([
    {
      pageName: 'splash',
      height: 74,
      width: 100,
      alpha: 1.000,
      active: true,
    },
    {
      pageName: 'about',
      height: HIDTABMAXHEIGHT,
      width: 100 - (HIDTABWIDTHDIFF * 1),
      alpha: 0.900,
      active: false,
    },
    {
      pageName: 'skills',
      height: HIDTABMAXHEIGHT - (HIDTABHEIGHTDIFF * 1),
      width: 100 - (HIDTABWIDTHDIFF * 2),
      alpha: 0.800,
      active: false,
    },
    {
      pageName: 'work',
      height: HIDTABMAXHEIGHT - (HIDTABHEIGHTDIFF * 2),
      width: 100 - (HIDTABWIDTHDIFF * 3),
      alpha: 0.700,
      active: false,
    },
    {
      pageName: 'contact',
      height: HIDTABMAXHEIGHT - (HIDTABHEIGHTDIFF * 3),
      width: 100 - (HIDTABWIDTHDIFF * 4),
      alpha: 0.600,
      active: false,
    },
  ]);

  const updateHidden = (tab: Tab, idx: number) => {

    tab.width = tab.width + (HIDTABWIDTHDIFF * (ANIMFREQ / ANIMDUR));

    if (tab.alpha < 1) {
      tab.alpha = tab.alpha + (0.1 * (ANIMFREQ / ANIMDUR));
    }
    if (idx === 0) {
      if (tab.height < 74) {
        tab.height = tab.height - (HIDTABMAXHEIGHT * (ANIMFREQ / (ANIMDUR / 2))) + (ACTIVETABHEIGHT) * (ANIMFREQ / (ANIMDUR / 2));
      } else {
        tab.height = 74;
      }
    } else {
      tab.height = tab.height + (HIDTABHEIGHTDIFF * (ANIMFREQ / ANIMDUR));
    }
  }

  const updateActive = (tab: Tab, currCycle: number) => {
    if (currCycle <= (ANIMDUR / 2)) {
      tab.alpha = tab.alpha - (1 * (ANIMFREQ / (ANIMDUR / 2)));
      tab.width = tab.width - ((HIDTABWIDTHDIFF * 4) * (ANIMFREQ / (ANIMDUR / 2)));
      tab.height = tab.height - (ACTIVETABHEIGHT * (ANIMFREQ / (ANIMDUR / 2)));
    } else {
      tab.alpha = tab.alpha + (.6 * (ANIMFREQ / (ANIMDUR / 2)));
      tab.height = tab.height + ((HIDTABMAXHEIGHT - (HIDTABHEIGHTDIFF * 3)) * (ANIMFREQ / (ANIMDUR / 2)));
    }
  }

  const onNavClick = (tabName: string) => {

    let activeTab = tabs[0];
    const clickedTab = tabs.find(tab => tab.pageName === tabName);
    if (isAnimating || activeTab === clickedTab) {
      return;
    }
    setIsAnimating(true);

    let hiddenTabs = tabs.slice(1);
    const numIter = hiddenTabs.findIndex(tab => tab.pageName === tabName) + 1;
    let i = 0;
    let x = ANIMFREQ;
    let tempTabs: Tab[];

    function updateCards() {
      
      hiddenTabs.forEach((tab, idx) => {
        updateHidden(tab, idx)
      });
      updateActive(activeTab, x);

      if (x < (ANIMDUR / 2)) {
        tempTabs = [activeTab, ...hiddenTabs];
      } else {
        tempTabs = [...hiddenTabs, activeTab];
      }

      setTabs(
        [
          ...tempTabs
        ]
      )

      if (x >= ANIMDUR) {
        activeTab.active = false;
        activeTab = tempTabs[0];
        activeTab.active = true;
        i++
        if (i >= numIter) {
          setIsAnimating(false);
          clearInterval(interval);
        } else {
          x = 0;
          hiddenTabs = tempTabs.slice(1);
        }
      }
      x = x + ANIMFREQ;
    }

    const interval = setInterval(updateCards, ANIMFREQ);

    // let y = (-.0003167 * (x * x)) + (.2783 * x)
  }

  return (
    <div
      className='main-outer-container'
    >
      <div
        className='main-inner-container'
      >
        {tabs.slice().reverse().map(tab => {
          return (
            <Tab
              pageName={tab.pageName}
              height={tab.height}
              key={tab.pageName}
              width={tab.width}
              alpha={tab.alpha}
              onNavClick={onNavClick}
            />
          )
        })}
      </div>
    </div>
  )
}