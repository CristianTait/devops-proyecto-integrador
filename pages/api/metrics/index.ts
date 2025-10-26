import { NextApiRequest, NextApiResponse } from "next";
import { register, collectDefaultMetrics } from "prom-client";

// Register default metrics only once.
// @ts-ignore
if (!globalThis.metricsRegistered) {
    const prefix = 'TechStore_';
    collectDefaultMetrics({prefix });
    // @ts-ignore
    globalThis.metricsRegistered = true;
}

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
}
