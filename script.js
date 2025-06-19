document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.square');
    const progress_bar = document.querySelector('.progress_bar');
    const submit_button = document.querySelector('.submit_button');
    const result_message = document.querySelector('.result_message');
    let selected_count = 0;
    const required_selections = 3;

    const particles_container = document.createElement('div');
    particles_container.className = 'particles';
    document.body.appendChild(particles_container);

    squares.forEach(square => {
        square.addEventListener('mouseover', () => {
            const monster = square.querySelector('.monster');
            monster.style.transform = `scale(1.1) ${get_random_wiggle()}`;
        });

        square.addEventListener('mouseout', () => {
            const monster = square.querySelector('.monster');
            monster.style.transform = 'scale(1)';
        });

        square.addEventListener('click', () => {
            handle_square_click(square);
        });
    });

    function handle_square_click(square) {
        if (!square.classList.contains('selected')) {
            if (selected_count < required_selections) {
                square.classList.add('selected');
                selected_count++;
                create_particles(square);
                update_progress();
                play_pop_sound();
            }
        } else {
            square.classList.remove('selected');
            selected_count--;
            update_progress();
        }

        submit_button.disabled = selected_count !== required_selections;
    }

    function update_progress() {
        const progress = (selected_count / required_selections) * 100;
        progress_bar.style.width = `${progress}%`;
        
        if (selected_count === required_selections) {
            progress_bar.classList.add('complete');
        } else {
            progress_bar.classList.remove('complete');
        }
    }

    function create_particles(square) {
        const rect = square.getBoundingClientRect();
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.backgroundColor = getComputedStyle(square).backgroundColor;
            particle.style.left = rect.left + rect.width / 2 + 'px';
            particle.style.top = rect.top + rect.height / 2 + 'px';
            
            const angle = (Math.random() * 360) * (Math.PI / 180);
            const velocity = 2 + Math.random() * 4;
            const lifetime = 500 + Math.random() * 1000;
            
            particles_container.appendChild(particle);
            
            const start_time = Date.now();
            
            function update_particle() {
                const elapsed = Date.now() - start_time;
                const progress = elapsed / lifetime;
                
                if (progress >= 1) {
                    particle.remove();
                    return;
                }
                
                const x = parseFloat(particle.style.left) + Math.cos(angle) * velocity;
                const y = parseFloat(particle.style.top) + Math.sin(angle) * velocity + (progress * 2);
                const scale = 1 - progress;
                const opacity = 1 - progress;
                
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.transform = `scale(${scale})`;
                particle.style.opacity = opacity;
                
                requestAnimationFrame(update_particle);
            }
            
            requestAnimationFrame(update_particle);
        }
    }

    function get_random_wiggle() {
        const rotation = (Math.random() - 0.5) * 10;
        return `rotate(${rotation}deg)`;
    }

    function play_pop_sound() {
        const audio = new Audio('data:audio/mp3;base64,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');
    }
}); 