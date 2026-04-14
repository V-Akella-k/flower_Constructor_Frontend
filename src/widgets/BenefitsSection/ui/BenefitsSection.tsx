import './benefits-section.css';
import { requestFormStore } from '@/features/RequestForm/model/requestFormStore';

export const BenefitsSection = () => {

    return (
        <section className='benefits-section'>
            <div className="benefits-section__grid">
                <div className="benefits-section__item">
                    <h3 className="benefits-section__question">Почему именно мы?</h3>
                    <p className="benefits-section__answer">
                        Мы создаем решения, которые не просто работают — они развивают бизнес.
                        Наш конструктор объединяет простоту no-code и мощь профессиональной разработки,
                        сохраняя баланс между скоростью и качеством.
                    </p>
                </div>

                <div className="benefits-section__item">
                    <h3 className="benefits-section__question">В чем инновация?</h3>
                    <p className="benefits-section__answer">
                        Наша команда первая создала уникальный сервис, позволяющий
                        создавать букеты и декор за несколько минут. Мы не повторяем
                        чужие идеи — мы создаем новое поколение бизнес-инструментов.
                        Наша платформа открывает возможности, которых раньше просто
                        не существовало!
                    </p>
                </div>
                <div className="benefits-section__item">
                    <h3 className="benefits-section__question">Что получает бизнес?</h3>
                    <p className="benefits-section__answer">
                        Кратное сокращение сроков запуска, экономия бюджета 70%,
                        внедрение и поддержку, прозрачные процессы, мгновенные
                        обновления, увеличение продаж и среднего чека.
                    </p>
                </div>
                <div className="benefits-section__item">
                    <h3 className="benefits-section__question">Почему нас стоит доверять?</h3>
                    <p className="benefits-section__answer">
                        Мы молодая команда, но с большим опытом.
                        Мы видим, как бизнесу не хватает простых и гибких инструментов — и создаём именно такое решение.
                        Не обещаем — делаем. Каждый день.
                    </p>
                </div>
            </div>
            <div className='benefits-section__buttons'>
                <button
                    className="benefits-section__open-popup"
                    onClick={() => requestFormStore.open()}
                >
                    Оставить заявку
                </button>
            </div>
        </section>
    );
}