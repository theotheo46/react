import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { getEmojies } from '../../../store/slices/forumSlice/forumAsyncThunks'
import Modal from '../../Modal'
import './EmojiContainer.pcss'
import ErrorInformer from '../../ErrorInformer'
import Input from '../../Input'
import { emojiCategory } from './emojiCategory'

interface Props {
  isActive: boolean
  addEmoji: (emoji: string) => void
}

const EmojiContainer = ({ isActive, addEmoji }: Props) => {
  const { emoji } = useAppSelector(state => state.forum)
  const dispatch = useAppDispatch()
  const [error, setError] = useState<Error | null>(null)
  const [searchText, setSearchText] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchText(value)
  }

  useEffect(() => {
    if (emoji.length === 0) {
      dispatch(getEmojies()).catch(err => setError(err as Error))
    }
    return
  }, [])
  return (
    <>
      {isActive && (
        <div className="emoji-container">
          <Input
            label="Поиск..."
            name="emoji-search"
            onChange={e => handleSearch(e)}
            value={searchText}
            height={'40px'}
            padding="0"
          />
          <div className="emoji-block">
            {emojiCategory.map((category, idx) => (
              <ul className="emoji-category" key={idx}>
                {emoji
                  ?.filter(item => item.group === category.slug)
                  .some(item =>
                    item.unicodeName
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  ) && category.translate}
                <div className="emoji-list">
                  {emoji
                    ?.filter(item => item.group === category.slug)
                    .map((item, idx) => (
                      <li
                        className={`emoji-item ${
                          !item.unicodeName
                            .toLowerCase()
                            .includes(searchText.toLowerCase()) &&
                          'display-none'
                        }`}
                        key={idx}
                        onClick={() => addEmoji(item.character)}>
                        {item.character}
                      </li>
                    ))}
                </div>
              </ul>
            ))}
          </div>
        </div>
      )}
      {error && (
        <Modal
          title="Ошибка при попытке загрузки эмодзи"
          onClose={() => {
            setError(null)
          }}>
          <ErrorInformer
            errorCode={error.name}
            errorText={error.message}
            errorStatus={error.stack || 'Попробуйте позже.'}
          />
        </Modal>
      )}
    </>
  )
}

export default EmojiContainer
