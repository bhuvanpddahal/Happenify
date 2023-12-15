import { icons } from '../data/event';
import {
    trending,
    your_events,
    new_to_you,
    visited,
    Trending,
    Your_Events,
    New_to_you,
    Visited
} from '../constants/event';

export const mapIcon = (activeTab: string) => {
    switch(activeTab) {
        case trending:
            return icons.trending;
        case your_events:
            return icons.yourEvents;
        case new_to_you:
            return icons.newToYou;
        case visited:
            return icons.visited;
        default:
            return icons.trending;
    }
};

export const mapText = (activeTab: string) => {
    switch(activeTab) {
        case trending:
            return Trending;
        case your_events:
            return Your_Events;
        case new_to_you:
            return New_to_you;
        case visited:
            return Visited;
        default:
            return Trending;
    }
};