import { icons } from '../data/tab';
import {
    trending,
    your_events,
    your_places,
    new_to_you,
    visited,
    booked,
    Trending,
    Your_Events,
    Your_Places,
    New_to_you,
    Visited,
    Booked
} from '../constants/tab';

export const mapIcon = (activeTab: string) => {
    switch(activeTab) {
        case trending:
            return icons.trending;
        case your_events:
        case your_places:
            return icons.shieldStar;
        case new_to_you:
            return icons.newToYou;
        case visited:
        case booked:
            return icons.check;
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
        case your_places:
            return Your_Places;
        case new_to_you:
            return New_to_you;
        case visited:
            return Visited;
        case booked:
            return Booked;
        default:
            return Trending;
    }
};