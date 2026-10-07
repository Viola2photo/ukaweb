import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowDown, ArrowRight, Check, Copy, Fish, MapPin, Menu, Phone, Utensils, X, ZoomIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { locations, products, schedule, steps } from '@/lib/brand-data'
import hero from '@/assets/DSC_8002.jpg.asset.json'
import logo from '@/assets/uncle-logo.png.asset.json'
import chef from '@/assets/uncle-chef.png.asset.json'

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: '鱈魚大叔｜招牌海鮮小吃・菜單據點・加盟方案' },
    { name: 'description', content: '一口咬下，海鮮好料一起登場。認識鱈魚大叔五款招牌小吃、菜單價格、夜市據點與24萬元先營運後付費加盟方案。營運企業：烏卡港企業社。' },
    { property: 'og:title', content: '鱈魚大叔｜把好料包進你的夜市日常' },
    { property: 'og:description', content: '五款招牌海鮮小吃、菜單與據點，還有先營運、後付費加盟方案。歡迎來電0980115055。' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: Index,
})
const nav = [{ id: 'about', label: '關於大叔' }, { id: 'products', label: '招牌商品' }, { id: 'menu', label: '美味菜單' }, { id: 'locations', label: '尋找大叔' }]
function Index() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modal, setModal] = useState<{ title: string; image?: string; description?: string; menu?: boolean } | null>(null)
  const [copyState, setCopyState] = useState<'idle' | 'success' | 'fallback'>('idle')
  async function copyLine() {
    let success = false
    try { await navigator.clipboard.writeText('0980115055'); success = true } catch {
      const field = document.createElement('textarea'); field.value = '0980115055'; field.setAttribute('readonly', ''); field.style.position = 'fixed'; field.style.left = '-9999px'; document.body.appendChild(field); field.select()
      try { success = document.execCommand('copy') } catch { success = false } finally { field.remove() }
    }
    setCopyState(success ? 'success' : 'fallback')
    if (!success) document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }
  const lineButton = (variant: 'sea' | 'paper' = 'sea') => <Button variant={variant} onClick={copyLine}>{copyState === 'success' ? <Check /> : <Copy />}{copyState === 'success' ? 'LINE ID 已複製' : '複製 LINE ID'}</Button>
  return <div className="brand-site" id="top">
    <header className="site-header"><div className="container-brand header-inner">
      <a href="#top" className="brand-link" aria-label="鱈魚大叔，回到首頁"><img src={logo.url} alt="" /><span className="brand-word">鱈魚大叔<small>UNCLE COD · 海鮮好料</small></span></a>
      <nav className="desktop-nav" aria-label="主要導覽">{nav.map(item => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}<Button variant="brand" asChild><a href="#franchise">加盟了解 <ArrowRight /></a></Button></nav>
      <Button variant="ghost" size="icon" className="mobile-toggle" aria-label={menuOpen ? '關閉選單' : '開啟選單'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
    </div>{menuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="手機導覽">{[...nav, { id: 'franchise', label: '加盟了解' }, { id: 'contact', label: '聯絡大叔' }].map(item => <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>{item.label}</a>)}</nav>}</header>
    <main>
      <section className="hero" aria-labelledby="hero-title"><i className="lantern lantern-one" aria-hidden="true" /><i className="lantern lantern-two" aria-hidden="true" /><div className="container-brand">
        <div className="hero-grid"><div className="hero-copy"><div className="eyebrow">夜市裡的海鮮好朋友</div><h1 id="hero-title">鱈魚大叔</h1><p className="hero-tagline">一口咬下，<br />海鮮好料一起登場。</p><p className="hero-description">外酥內彈，熱騰騰的海味。<br />大叔把好料，包進你的夜市日常。</p><div className="cta-row"><Button variant="brand" asChild><a href="#products"><Utensils />來看看招牌</a></Button><Button variant="paper" asChild><a href="#locations"><MapPin />尋找附近的大叔</a></Button></div></div>
        <div className="hero-photo"><img src={hero.url} alt="鱈魚大叔五款招牌海鮮小吃大合照" fetchPriority="high" /><div className="hero-stamp" aria-hidden="true">海鮮好料<br />酥香登場</div><img className="hero-sticker" src={logo.url} alt="鱈魚大叔Q版標誌" /></div></div>
        <div className="hero-bottom"><span><Fish size={17} />好料看得見・海味吃得到</span><span>一份酥香，一點夜市的人情味</span><a href="#about">認識大叔 <ArrowDown size={15} /></a></div>
      </div></section>
      <div className="wave-band" aria-hidden="true" />
      <section id="about" className="section about-section"><div className="container-brand about-grid"><div className="about-art"><img src={logo.url} alt="笑著端出海鮮小吃的Q版鱈魚大叔" loading="lazy" /></div><div className="about-copy"><span className="section-kicker">HELLO, 我們是鱈魚大叔</span><h2 className="section-heading">好料不藏私，<br />每一口都實在。</h2><p>逛夜市，總想找一份熱騰騰的好滋味。<br />鱈魚大叔用鱈魚漿包進各式海鮮與食材，炸出酥香外皮，留下彈嫩口感。</p><p>喜歡花枝、墨魚，還是整顆蝦仁與干貝？<br />挑一份喜歡的，和家人朋友一起分享，讓夜市日常多一點海味。</p><div className="about-sign">鱈魚大叔，把好料包進你的夜市日常。</div></div></div></section>
      <section id="products" className="section"><div className="container-brand"><div className="section-top"><div><span className="section-kicker">大叔的拿手好料</span><h2 className="section-heading">五款招牌，各有好滋味</h2><p className="section-intro">酥香外皮裡，藏著大叔認真準備的食材。</p></div><Button variant="paper" asChild><a href="#menu">看看菜單價格 <ArrowRight /></a></Button></div><div className="products-grid">{products.map((p, i) => <article className="product" key={p.name} data-product={p.name}><Button variant="photo" aria-label={`放大${p.name}照片`} onClick={() => setModal({ title: p.name, image: p.image, description: p.description })}><img src={p.image} alt={p.name} data-source={p.filename} loading="lazy" /><span className="photo-zoom"><ZoomIn size={17} /></span></Button><div className="product-meta"><span className="product-number">0{i + 1}</span><h3>{p.name}</h3></div><div className="product-subtitle">{p.subtitle}</div><p>{p.description}</p>{p.detail && <Button variant="link" className="product-detail" onClick={() => setModal({ title: '鮮貝鱈魚蝦球｜好料剖面', image: p.detail, description: p.detailText })}><ZoomIn />看看好料剖面</Button>}</article>)}</div></div></section>
      <section id="menu" className="section menu-section"><div className="container-brand menu-layout"><div><span className="section-kicker">今天，想吃哪一味？</span><h2 className="section-heading">大叔的美味菜單</h2><p className="menu-phrase">一個人解饞，<br />或揪朋友一起分著吃。</p><Button variant="paper" onClick={() => setModal({ title: '鱈魚大叔｜美味菜單', menu: true, description: '五款招牌商品，小份、大份與特大份價格。' })}><ZoomIn />放大菜單</Button></div><div><MenuTable /><p className="menu-note">價格單位：新臺幣／元</p></div></div></section>
      <section id="locations" className="section"><div className="container-brand"><span className="section-kicker">夜市見，大叔在這裡</span><h2 className="section-heading">尋找你的海味日常</h2><p className="section-intro">走到熟悉的街口，找一份酥香好料。</p><ul className="locations-grid">{locations.map(l => <li key={l} data-location><MapPin size={15} /><span>{l}</span></li>)}</ul><h3 className="weekly-title">大叔的每週行程</h3><div className="weekly-grid">{schedule.map(s => <div className="weekly-item" key={s.day} data-location><span className="day-stamp" aria-label={`星期${s.day}`}>{s.day}</span><span>{s.place}</span></div>)}</div><p className="location-note">各點位與營運時間會按實際狀況調整，出發前歡迎先聯絡確認。<br />通常營運時間為下午3點至晚上11點，依各點位實際狀況調整。</p></div></section>
      <section id="franchise" className="section franchise-section"><div className="container-brand"><div className="franchise-header"><div><span className="section-kicker">和大叔一起，把好料帶到更多街口</span><h2 className="franchise-headline">先營運、後付費<br />加盟方案</h2><p className="franchise-intro">先把開店準備做好，再一步步開始。<br />歡迎來聊聊，也來現場看看大叔的日常。</p></div><img className="chef-photo" src={chef.url} alt="身穿黑色廚師服、手持鱈魚大叔產品的單人品牌形象" loading="lazy" /></div><div className="price-strip"><div className="price-item"><small>合約總金額</small><div className="price-value">240,000<span> 元</span></div><p>設備、貨品、耗材與開辦費包含在內</p></div><div className="price-item"><small>分期付款</small><div className="price-value">12<span> 期 × </span>20,000<span> 元</span></div><p>簽約滿一個月後支付第一期</p></div><div className="price-item"><small>提供開辦費</small><div className="price-value">5<span> 萬元</span></div><p>已含於24萬元中，不另外加收</p></div></div><div className="steps">{steps.map((s, i) => <article className="step" key={s.title} data-step><span className="step-number">{i + 1}</span><div><h3>{s.title}</h3><p>{s.body}</p>{s.items && <ul>{s.items.map(item => <li key={item}>{item}</li>)}</ul>}{s.quote && <p className="step-quote">{s.quote}</p>}{s.note && <p>{s.note}</p>}</div></article>)}</div><p className="franchise-footnote">開業時程依實際準備情形；付款日期與合作內容以正式契約為準。首批貨品金額為可銷售金額說明，實際營收與獲利依經營情形而定。</p><div className="cta-row franchise-cta"><Button variant="brand" asChild><a href="tel:0980115055"><Phone />來電了解加盟</a></Button>{lineButton()}</div></div></section>
      <section id="contact" className="contact-section"><div className="container-brand"><h2 className="section-heading">想吃好料，還是想一起開店？</h2><p>找大叔聊聊吧。<br />商品、據點與加盟問題，歡迎直接聯絡。</p><div className="cta-row"><Button variant="paper" asChild><a href="tel:0980115055"><Phone />0980-115-055</a></Button>{lineButton('paper')}</div><span className="line-id">LINE ID：0980115055（同電話）</span><div className="copy-feedback" role="status" aria-live="polite">{copyState === 'success' ? '已複製 LINE ID：0980115055' : copyState === 'fallback' ? '無法自動複製，請選取下方 LINE ID 手動複製。' : ''}</div>{copyState === 'fallback' && <label className="copy-backup">LINE ID<input readOnly value="0980115055" onFocus={e => e.currentTarget.select()} aria-label="手動複製 LINE ID" /></label>}</div></section>
    </main>
    <footer className="site-footer"><div className="container-brand"><div className="footer-grid"><div><div className="footer-title">鱈魚大叔｜加盟方／營運企業：烏卡港企業社</div><p>統一編號：80011102</p><p>電話：<a href="tel:0980115055">0980115055</a>（LINE ID同電話）</p></div><div><p>食品業者登錄字號：F-202283558-00000-7</p><p>產品責任保險投保單位：中國信托</p><p>保單號碼：1812-26PR0000091</p></div></div><div className="footer-bottom"><span>© 鱈魚大叔 · 烏卡港企業社</span><a href="#top">回到頂端 ↑</a></div></div></footer>
    <div className="mobile-contact"><Button variant="brand" asChild><a href="tel:0980115055"><Phone />來電找大叔</a></Button>{lineButton()}</div>
    <Dialog open={modal !== null} onOpenChange={open => { if (!open) setModal(null) }}><DialogContent className={`image-modal ${modal?.menu ? 'dialog-menu' : ''}`}><DialogTitle>{modal?.title}</DialogTitle><DialogDescription>{modal?.description}</DialogDescription>{modal?.image && <img src={modal.image} alt={modal.title} />}{modal?.menu && <MenuTable />}</DialogContent></Dialog>
  </div>
}
function MenuTable() { return <table className="menu-table"><thead><tr><th scope="col">招牌品項</th><th scope="col">小</th><th scope="col">大</th><th scope="col">特大</th></tr></thead><tbody>{products.map(p => <tr key={p.name}><td>{p.name}</td>{p.prices.map((price, i) => <td key={i}>{price}</td>)}</tr>)}</tbody></table> }
