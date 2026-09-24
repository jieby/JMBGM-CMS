import { getPayload } from 'payload'
import config from '../payload.config'
import 'dotenv/config'

async function seed() {
  console.log('🌱 Starting JMBGM database seeding...')

  if (!process.env.DATABASE_URI) {
    console.error('❌ Error: DATABASE_URI is missing in environment variables.')
    process.exit(1)
  }

  const payload = await getPayload({ config })

  // 1. Seed Admin User
  console.log('👤 Checking admin user...')
  const existingUsers = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: 'admin@jmbgm.org',
      },
    },
  })

  if (existingUsers.totalDocs === 0) {
    console.log('➕ Creating default admin user: admin@jmbgm.org')
    await payload.create({
      collection: 'users',
      data: {
        name: 'JMBGM Administrator',
        email: 'admin@jmbgm.org',
        password: 'password123',
        role: 'admin',
      },
    })
    console.log('✅ Admin user created. (Email: admin@jmbgm.org, Password: password123)')
  } else {
    console.log('ℹ️ Admin user already exists.')
  }

  // 2. Seed Pages
  console.log('📄 Checking default pages...')
  const existingPages = await payload.find({
    collection: 'pages',
    limit: 1,
  })

  if (existingPages.totalDocs === 0) {
    console.log('➕ Creating initial Pages...')
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Welcome to JMBGM',
        slug: 'home',
        heroSubtitle: 'Proclaiming truth, building community, and transforming lives through faith.',
        _status: 'published',
        publishedAt: new Date().toISOString(),
      },
    })

    await payload.create({
      collection: 'pages',
      data: {
        title: 'About Our Ministry',
        slug: 'about',
        heroSubtitle: 'Rooted in Christ, devoted to truth, and dedicated to transforming our community.',
        _status: 'published',
        publishedAt: new Date().toISOString(),
      },
    })
    console.log('✅ Default pages created.')
  } else {
    console.log('ℹ️ Pages collection already contains records.')
  }

  // 3. Seed Announcements
  console.log('📢 Checking announcements...')
  const existingAnnouncements = await payload.find({
    collection: 'announcements',
    limit: 1,
  })

  if (existingAnnouncements.totalDocs === 0) {
    console.log('➕ Creating initial sample announcements...')
    
    await payload.create({
      collection: 'announcements',
      data: {
        title: 'Sunday Miracle & Worship Celebration',
        category: 'Sunday Service',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Main Sanctuary & Online Livestream',
        featured: true,
        summary:
          'Join us for our uplifting weekly Sunday celebration with worship, heartfelt prayer, and life-changing ministry of the Word. All are welcome!',
        _status: 'published',
      },
    })

    await payload.create({
      collection: 'announcements',
      data: {
        title: 'Community Food Drive & Care Outreach',
        category: 'Community Outreach',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'JMBGM Community Outreach Center',
        featured: true,
        summary:
          'Volunteers and donations are welcome as we distribute fresh groceries, care packages, and essential items to local families in need.',
        _status: 'published',
      },
    })

    await payload.create({
      collection: 'announcements',
      data: {
        title: 'Midweek Word & Corporate Prayer Gathering',
        category: 'Ministry Update',
        date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Fellowship Hall & Zoom',
        featured: false,
        summary:
          'Deep-dive into inductive scripture study, discipleship discussion, and corporate prayer every Wednesday evening at 7:00 PM.',
        _status: 'published',
      },
    })

    console.log('✅ Sample announcements created.')
  } else {
    console.log('ℹ️ Announcements collection already contains records.')
  }

  console.log('🎉 Seeding completed successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})
