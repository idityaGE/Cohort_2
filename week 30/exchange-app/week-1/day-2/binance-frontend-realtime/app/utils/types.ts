
export interface KLine {
    close: string;
    end: string;
    high: string;
    low: string;
    open: string;
    quoteVolume: string;
    start: string;
    trades: string;
    volume: string;
}

export interface Trade {
    id: number,
    isBuyerMaker: boolean,
    price: string,
    quantity: string,
    quoteQuantity: string,
    timestamp: number
}

export interface Depth {
    bids: [string, string][],
    asks: [string, string][],
    lastUpdateId: string
}

export interface Ticker {
    "firstPrice": string,
    "high": string,
    "lastPrice": string,
    "low": string,
    "priceChange": string,
    "priceChangePercent": string,
    "quoteVolume": string,
    "symbol": string,
    "trades": string,
    "volume": string
}

export interface BackendDepth {
    data: {
        E: number,
        T: number,
        U: number,
        a: [string, string][],
        b: [string, string][],
        e: string,
        s: string,
        u: number
    },
    stream: string
}

export interface BackendTicker {
    data: {
        E: number,
        V: string,
        c: string,
        e: string,
        h: string,
        l: string,
        n: number,
        o: string,
        s: string,
        v: string
    },
    stream: string
}

export interface BackendTrade {
    data: {
        E: number,
        M: boolean,
        T: number,
        a: string,
        b: string,
        e: string,
        m: boolean,
        p: string,
        q: string,
        s: string,
        t: number
    },
    stream: string
}