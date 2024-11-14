import { NextResponse } from 'next/server'
import User from '@/app/(models)/User'
import bcrypt from 'bcrypt'

export async function POST(req) {
    try {
        const body = await req.json()
        const userData = body.formData

        // Check if data is provided
        if (!userData?.email || !userData?.password) {
            return NextResponse.json({ message: "No data provided" }, { status: 400 })
        }
        // Check if email is duplicate
        const duplicate = await User.findOne({ email: userData.email }).lean().exec()

        if (duplicate) {
            return NextResponse.json({ message: "Email already exists" }, { status: 409 })
        }

        // Hash password
        const hashPassword = await bcrypt.hash(userData.password, 10)
        userData.password = hashPassword

        await User.create(userData)
        return NextResponse.json({ message: "User created" }, { status: 201 })
    }
    catch (error) {
        console.error(err)
        return NextResponse.json({ message: "Error", err }, { status: 500 })

    }
}