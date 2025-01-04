import { NextResponse } from 'next/server'
import { v2 as Cloudinary } from 'cloudinary'

import { configCloudinary } from '@/lib/cloudinary'

export async function POST(request: Request) {
  try {
    const body = await request?.json()

    const { public_id = '', resource_type = '', type = '' } = body

    if (!public_id || typeof public_id !== 'string') {
      return NextResponse.error()
    }
    Cloudinary.config({
      cloud_name: configCloudinary.cloud_name,
      api_key: configCloudinary?.api_key,
      api_secret: configCloudinary?.api_secret
    })

    const res = await Cloudinary.uploader.destroy(public_id, {
      type: type,
      resource_type: resource_type
    })

    return NextResponse.json({ ...res })
  } catch (error) {
    console.log(error)
    throw new Error('Something went wrong!')
  }
}
