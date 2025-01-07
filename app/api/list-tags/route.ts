import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export async function GET(_request: Request) {
  try {
    const listTags = await prisma?.post?.findMany({
      select: {
        tag: true
      }
    })

    const tags = Array.from(new Set(listTags?.flatMap((post) => post?.tag)))

    return NextResponse.json(tags)
  } catch (error) {
    console.log(error)
    throw new Error('Something went wrong!')
  }
}
