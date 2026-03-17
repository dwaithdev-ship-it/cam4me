import React, { useState, useRef } from 'react'
import '../App.css'

function ProfileSetupScreen({ initialProfile = {}, onComplete = () => {}, autofillName = '', autofillMobile = '' }) {
  const [profile, setProfile] = useState({
    name: autofillName || initialProfile.name || '',
    mobile: autofillMobile || initialProfile.mobile || '',
    photo: initialProfile.photo || ''
  })
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const textareaRef = useRef(null)

  const canContinue = !!profile.photo

  const compressImage = (dataUrl, maxWidth = 800, quality = 0.8) =>
    new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width)
        const w = Math.round(img.width * scale)
        const h = Math.round(img.height * scale)
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, w, h)
        const out = canvas.toDataURL('image/jpeg', quality)
        resolve(out)
      }
      img.onerror = () => resolve(dataUrl)
      img.src = dataUrl
    })

  const uploadFile = async (dataUrl) => {
    setIsUploading(true)
    try {
      await new Promise((r) => setTimeout(r, 400))
      return dataUrl
    } finally {
      setIsUploading(false)
    }
  }

  const openFilePicker = (captureEnv = false) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    if (captureEnv) input.capture = 'environment'
    input.onchange = async (e) => {
      const f = e.target.files && e.target.files[0]
      if (!f) return
      const reader = new FileReader()
      reader.onload = async (ev) => {
        try {
          const compressed = await compressImage(ev.target.result, 800, 0.75)
          setProfile((p) => ({ ...p, photo: compressed }))
        } catch (err) {
          console.error(err)
          setError('Failed to process image.')
        }
      }
      reader.readAsDataURL(f)
    }
    input.click()
  }

  const handleTakePhoto = () => openFilePicker(true)
  const handleChooseFromLibrary = () => openFilePicker(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((p) => ({ ...p, [name]: value }))
  }

  const handleContinue = async () => {
    setError('')
    if (!profile.name) return setError('Please enter your full name.')
    if (!canContinue) return setError('Please add a photo.')

    try {
      let photoUrl = profile.photo
      if (photoUrl && photoUrl.startsWith('data:')) {
        photoUrl = await uploadFile(photoUrl)
      }
      const finalProfile = { ...profile, photo: photoUrl }
      onComplete(finalProfile)
    } catch (err) {
      console.error(err)
      setError('Failed to save profile. Try again.')
    }
  }

  return (
    <div className="profile-setup-container">
      <div className="status-bar"><span className="time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>

      <div className="content">
        <div className="header-row"><img className="logo" src="/logo_camera.png" alt="Logo" /></div>
        <div className="ad-section" style={{ marginTop: '20px' }}>Sponsored Ad</div>

        <div className="photo-upload-wrapper">
          <div className="photo-circle" role="button" tabIndex={0} onClick={handleTakePhoto} title="Tap to take a photo">
            {profile.photo ? <img src={profile.photo} alt="Profile" className="photo-img" /> : (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)"><path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
            )}
            {!profile.photo && <div className="photo-hint">Add Photo</div>}
          </div>

          {/* small logo badge attached to avatar */}
          <button type="button" className="avatar-badge" onClick={handleChooseFromLibrary} aria-label="Upload photo">
            <img src="/logo_bubble.png" alt="camera" />
          </button>
        </div>

        <div className="fields blank-fields">
          <label className="field-label">Full name</label>
          <input className="blank-input" name="name" value={profile.name} onChange={handleChange} placeholder="Full name" readOnly />

          <label className="field-label">Mobile</label>
          <input className="blank-input" name="mobile" value={profile.mobile} onChange={handleChange} placeholder="Mobile" readOnly />
        </div>

        {error && <div className="error-text">{error}</div>}

        <div className="actions-row">
          <button className="continue-btn" onClick={handleContinue} disabled={!canContinue || isUploading}>{isUploading ? 'Saving…' : 'Continue'}</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileSetupScreen
