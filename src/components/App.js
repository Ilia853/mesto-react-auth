import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({ name: "", link: "" });
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getProfile()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.log("userDataError", err);
            });
    }, []);

    React.useEffect(() => {
        api.getInitialCards()
            .then((cardsData) => {
                setCards(cardsData);
            })
            .catch((err) => {
                console.log("initialCards", err);
            });
    }, []);

    const handleCardDelete = (id) => {
        api.delImage(id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== id));
            })
            .catch((err) => {
                console.log("deletingCard", err);
            });
    };

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
            })
            .catch((err) => {
                console.log("likeCard", err);
            });
    }

    function handleUpdateUser(userData) {
        api.editProfile(userData.name, userData.about)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log("editProfile", err);
            });
    }

    function handleUpdateAvatar(avatarData) {
        api.changeAvatar(avatarData.avatar).then((avatarData) => {
            setCurrentUser(avatarData);
            closeAllPopups();
        });
    }

    function handleAddPlaceSubmit(newCard) {
        api.addImage(newCard.name, newCard.link, newCard.likes).then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        });
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({ name: "", link: "" });
    }

    return (
        <div>
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <Main
                    onEditProfile={() => setIsEditProfilePopupOpen(true)}
                    onAddPlace={() => setIsAddPlacePopupOpen(true)}
                    onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                    onCardClick={setSelectedCard}
                    cards={cards}
                    onCardDelete={handleCardDelete}
                    onCardLike={handleCardLike}
                />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                <Footer />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;