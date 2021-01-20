/**
 *  Converts a string with pixel measurement into a parsed number. By default
 *  this function will grab the fontSize of the document body.
 *  @param size string optional pixel size e.g. "42px"
 *  @returns the current computed fontsize for manual REM calculations
 */
export declare const pixelSize: (size?: string) => number;
/**
 * Scrolls the window to an element
 * @param element the element to scroll to
 * @param behavior how you want it to scroll
 */
export declare const scrollToElement: (element: any, behavior: 'smooth' | 'auto' | undefined) => void;
export declare const scrollToAnchor: (anchor?: string, behavior?: 'smooth' | 'auto' | undefined) => void;
//# sourceMappingURL=document.d.ts.map