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

  // 4. Seed Story Chapters (5-Act Cinematic Narrative)
  console.log('🎬 Checking Story Chapters (5-Act Narrative)...')
  const existingChapters = await payload.find({
    collection: 'story-chapters',
    limit: 1,
  })

  if (existingChapters.totalDocs === 0) {
    console.log('➕ Seeding 5-Act Cinematic Narrative Story Chapters...')

    const chapters = [
      {
        order: 0,
        chapterKey: 'prologue',
        pillarName: 'Prologue • The Sovereign Architect',
        headline: 'Jesus the Master Builder Global Ministry',
        subheadline:
          "Everything begins in God's sovereign hands. Before the foundations of the cosmos were laid, the divine master builder set every destiny in motion.",
        scriptureRef: 'Hebrews 3:4',
        scriptureText: 'For every house is built by someone, but God is the builder of everything.',
        _status: 'published',
      },
      {
        order: 1,
        chapterKey: 'evangelism',
        pillarName: 'Pillar I • Evangelism',
        headline: 'The True Vine & The Fruit',
        subheadline:
          'Reaching souls by abiding in Christ. Evangelism is not merely human striving, but the living, overflowing fruit of eternal intimacy with the True Vine.',
        scriptureRef: 'John 15:5',
        scriptureText:
          'I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing.',
        _status: 'published',
      },
      {
        order: 2,
        chapterKey: 'discipleship',
        pillarName: 'Pillar II • Discipleship',
        headline: 'The Seed & Deep Good Soil',
        subheadline:
          'Internalizing the Word through sacred formation. Sown in pure, fertile, unobstructed good soil, the seed takes deep root to produce an enduring spiritual harvest.',
        scriptureRef: 'Matthew 13:8 & Colossians 2:7',
        scriptureText:
          'Still other seed fell on good soil, where it produced a crop—a hundred, sixty or thirty times what was sown... Rooted and built up in Him, strengthened in the faith as you were taught.',
        _status: 'published',
      },
      {
        order: 3,
        chapterKey: 'leadership',
        pillarName: 'Pillar III • Leadership',
        headline: 'The Holy Fire',
        subheadline:
          'Equipped by the flame of the Holy Spirit. Servant leaders are forged in the refiner’s fire—burning as guiding beacons of divine light that illuminate the path for others.',
        scriptureRef: 'Hebrews 1:7 & Acts 2:3–4',
        scriptureText:
          'He makes His ministers a flame of fire... They saw what seemed to be tongues of fire that separated and came to rest on each of them. And all of them were filled with the Holy Spirit.',
        _status: 'published',
      },
      {
        order: 4,
        chapterKey: 'mission',
        pillarName: 'Pillar IV • Mission',
        headline: 'Go therefore and make disciples of all the nations',
        subheadline:
          'Following Jesus into the nations. As the Holy Fire illuminates the shoreline, disciples walk directly in the footsteps of Christ, taking the gospel of peace to the ends of the earth.',
        scriptureRef: 'Romans 10:15 & Matthew 28:19–20',
        scriptureText:
          'How beautiful are the feet of those who bring good news!... Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.',
        _status: 'published',
      },
    ]

    for (const chapter of chapters) {
      await payload.create({
        collection: 'story-chapters',
        data: chapter as any,
      })
      console.log(`  ✨ Created Act ${chapter.order}: ${chapter.headline}`)
    }

    console.log('✅ 5-Act Narrative chapters successfully seeded.')
  } else {
    console.log('ℹ️ StoryChapters collection already contains records.')
  }

  console.log('🎉 Seeding completed successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})
