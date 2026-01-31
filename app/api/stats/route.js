
import { NextResponse } from 'next/server';
import os from 'os';

function getCPUUsage() {
    const cpus = os.cpus();
    let user = 0;
    let nice = 0;
    let sys = 0;
    let idle = 0;
    let irq = 0;
    let total = 0;

    for (const cpu in cpus) {
        user += cpus[cpu].times.user;
        nice += cpus[cpu].times.nice;
        sys += cpus[cpu].times.sys;
        idle += cpus[cpu].times.idle;
        irq += cpus[cpu].times.irq;
    }

    total = user + nice + sys + idle + irq;

    return {
        idle: idle,
        total: total
    };
}

let startUsage = getCPUUsage();

export async function GET() {
    const endUsage = getCPUUsage();

    const idleDiff = endUsage.idle - startUsage.idle;
    const totalDiff = endUsage.total - startUsage.total;

    // We update the startUsage for the next call
    // But wait, if multiple clients call this, it gets messy.
    // Better to sample inside the request with a small delay.

    const start = getCPUUsage();
    await new Promise(resolve => setTimeout(resolve, 100));
    const end = getCPUUsage();

    const iDiff = end.idle - start.idle;
    const tDiff = end.total - start.total;
    const usage = 100 - (100 * iDiff / tDiff);

    return NextResponse.json({
        cpuLoad: Math.round(usage),
        uptime: os.uptime(),
        freeMem: os.freemem(),
        totalMem: os.totalmem(),
        platform: os.platform(),
        arch: os.arch()
    });
}
