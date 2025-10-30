/* =======================================================================
   Entrega III — SPA básico + Templates + Validação + LocalStorage
   • Compatível com site multipágina (não quebra seu HTML/CSS atual)
   • SPA só ativa se:
       - houver <main id="app"> e (location.hash começa com "#/") OU
       - <body data-spa="true"> (força SPA sempre que houver #app)
   ======================================================================= */

(function () {
  'use strict';

  // Ano no rodapé (acessível)
  document.addEventListener('DOMContentLoaded', () => {
    const anoEl = document.getElementById('ano');
    if (anoEl) anoEl.textContent = new Date().getFullYear();
  });

  /* -------------------------------------------------------------------
     Templates (HTML em strings). Ajuste os textos/imagens conforme quiser
     ------------------------------------------------------------------- */
  const Templates = {
    home: () => `
      <section class="hero" aria-labelledby="titulo-hero">
        <div class="grid">
          <div>
            <h1 id="titulo-hero">Plataforma Solidária — conectando ONGs, voluntários e doadores</h1>
            <p>Um espaço onde organizações sociais divulgam seus projetos, voluntários se inscrevem e doadores apoiam causas de todo o Brasil.</p>
            <p>
              <a class="btn btn--primary" href="#/projetos">Conheça os projetos</a>
              <a class="btn btn--ghost" href="#/cadastro">Como participar</a>
            </p>
          </div>
          <figure>
            <img src="assets/img/hero.png" width="1600" height="900" alt="Voluntários da ONG atuando em atividades comunitárias">
            <figcaption class="helper">Atividades comunitárias realizadas pela ONG.</figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="sobre">
        <h2 id="sobre">Sobre a Plataforma</h2>
        <div class="grid grid-3">
          <article class="card" aria-labelledby="p1">
            <h3 id="p1">Nosso Propósito</h3>
            <p>Facilitar a conexão entre ONGs, doadores e voluntários por meio da tecnologia.</p>
          </article>
          <article class="card" aria-labelledby="p2">
            <h3 id="p2">Como Funciona</h3>
            <img src="assets/img/equipe.png" alt="Retrato ilustrativo da equipe e voluntários">
            <p>As ONGs se cadastram, divulgam seus projetos e acompanham resultados.</p>
          </article>
          <article class="card" aria-labelledby="p3">
            <h3 id="p3">Transparência</h3>
            <p>Publicamos relatórios e dados abertos sobre as ações sociais cadastradas.</p>
          </article>
        </div>
      </section>

      <section aria-labelledby="contato">
        <h2 id="contato">Entre em Contato</h2>
        <p>Tem uma ONG ou projeto social? Fale conosco para cadastrar sua instituição na Plataforma Solidária.</p>
        <address class="card" aria-label="Informações de contato">
          <p><strong>E-mail:</strong> <a href="mailto:contato@ongexemplo.org">contato@ongexemplo.org</a></p>
          <p><strong>Telefone:</strong> <a href="tel:+5511999999999">+55 (11) 99999-9999</a></p>
          <p><strong>Endereço:</strong> Rua da Cidadania, 123 — São Paulo/SP</p>
        </address>
      </section>
    `,

    projetos: () => `
      <header>
        <h1 class="title">Projetos sociais em andamento</h1>
        <p class="subtitle">Veja as iniciativas atuais e como participar como <strong>voluntário</strong> ou <strong>doador</strong>.</p>
      </header>

      <section aria-labelledby="educacao">
        <article class="card">
          <div class="grid grid-2">
            <figure>
              <img src="assets/img/projeto1.png" alt="Aula comunitária de alfabetização">
            </figure>
            <div>
              <h2 id="educacao">Alfabetização Comunitária</h2>
              <p>Oficinas semanais com metodologia participativa, acolhendo jovens e adultos que desejam avançar nos estudos.</p>
              <ul>
                <li><strong>Meta:</strong> 150 alunos por semestre</li>
                <li><strong>Voluntariado:</strong> monitores, apoio pedagógico</li>
                <li><strong>Doações:</strong> cadernos, lápis, lanches</li>
              </ul>
              <p class="mt-2">
                <a class="btn btn--primary" href="#/cadastro">Quero ser voluntário</a>
                <a class="btn btn--ghost" href="#/cadastro">Saiba mais</a>
              </p>
            </div>
          </div>
        </article>
      </section>

      <section aria-labelledby="cestas">
        <article class="card">
          <div class="grid grid-2">
            <figure>
              <img src="assets/img/projeto2.png" alt="Cestas básicas organizadas para entrega">
            </figure>
            <div>
              <h2 id="cestas">Cestas Básicas</h2>
              <p>Campanha contínua para segurança alimentar de famílias em vulnerabilidade. Transparência com metas e prestação de contas.</p>
              <ul>
                <li><strong>Meta:</strong> 500 cestas/mês</li>
                <li><strong>Voluntariado:</strong> logística e triagem</li>
                <li><strong>Doações:</strong> alimentos não perecíveis</li>
              </ul>
              <p class="mt-2">
                <a class="btn btn--secondary" href="#/cadastro">Doar agora</a>
                <a class="btn btn--ghost" href="#/cadastro">Detalhes</a>
              </p>
            </div>
          </div>
        </article>
      </section>
    `,

    cadastro: () => `
      <header>
        <h1 class="title">Cadastro na Plataforma</h1>
        <p>Campos com <strong class="required">*</strong> são obrigatórios.</p>
      </header>

      <div id="live-region" class="visually-hidden" aria-live="polite" aria-atomic="true"></div>

      <form id="cadastro-form" novalidate>
        <fieldset>
          <legend>Perfil</legend>
          <label class="label" for="perfil">Sou <span class="required">*</span></label>
          <select id="perfil" name="perfil" required>
            <option value="" selected disabled>Selecione</option>
            <option value="ong">ONG</option>
            <option value="voluntario">Voluntário</option>
            <option value="doador">Doador</option>
          </select>
          <p class="helper">Escolha o tipo de perfil para personalizar sua experiência.</p>
        </fieldset>

        <fieldset>
          <legend>Informações pessoais</legend>

          <label class="label" for="nome">Nome Completo <span class="required">*</span></label>
          <input id="nome" name="nome" type="text" autocomplete="name" placeholder="Seu nome completo" required>

          <div class="row">
            <div class="col-sm-6">
              <label class="label" for="email">E-mail <span class="required">*</span></label>
              <input id="email" name="email" type="email" autocomplete="email" placeholder="seuemail@exemplo.com" required>
            </div>
            <div class="col-sm-6">
              <label class="label" for="telefone">Telefone <span class="required">*</span></label>
              <input id="telefone" name="telefone" type="tel" inputmode="tel" placeholder="(11) 99999-9999" required>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-6">
              <label class="label" for="cpf">CPF <span class="required">*</span></label>
              <input id="cpf" name="cpf" type="text" inputmode="numeric" placeholder="000.000.000-00" required>
            </div>
            <div class="col-sm-6">
              <label class="label" for="nascimento">Data de Nascimento <span class="required">*</span></label>
              <input id="nascimento" name="nascimento" type="date" required>
              <p class="helper">Mínimo 16 anos.</p>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Endereço</legend>
          <div class="row">
            <div class="col-sm-3">
              <label class="label" for="cep">CEP <span class="required">*</span></label>
              <input id="cep" name="cep" type="text" inputmode="numeric" placeholder="00000-000" required>
            </div>
            <div class="col-sm-6">
              <label class="label" for="cidade">Cidade <span class="required">*</span></label>
              <input id="cidade" name="cidade" type="text" autocomplete="address-level2" placeholder="Sua cidade" required>
            </div>
            <div class="col-sm-3">
              <label class="label" for="estado">Estado <span class="required">*</span></label>
              <select id="estado" name="estado" autocomplete="address-level1" required>
                <option value="" selected disabled>Selecione</option>
                <option>AC</option><option>AL</option><option>AP</option><option>AM</option>
                <option>BA</option><option>CE</option><option>DF</option><option>ES</option>
                <option>GO</option><option>MA</option><option>MT</option><option>MS</option>
                <option>MG</option><option>PA</option><option>PB</option><option>PR</option>
                <option>PE</option><option>PI</option><option>RJ</option><option>RN</option>
                <option>RS</option><option>RO</option><option>RR</option><option>SC</option>
                <option>SP</option><option>SE</option><option>TO</option>
              </select>
            </div>
          </div>

          <label class="label" for="endereco">Endereço <span class="required">*</span></label>
          <input id="endereco" name="endereco" type="text" autocomplete="street-address" placeholder="Rua, número, complemento" required>
        </fieldset>

        <fieldset>
          <legend>Interesse</legend>
          <div class="row">
            <div class="col-sm-6">
              <label class="label" for="areas">Áreas de interesse</label>
              <select id="areas" name="areas" multiple aria-describedby="areas-ajuda">
                <option>Educação</option><option>Alimentação</option>
                <option>Comunicação</option><option>Logística</option>
              </select>
              <p id="areas-ajuda" class="helper">Use Ctrl/⌘ para múltiplas opções.</p>
            </div>
            <div class="col-sm-6">
              <label class="label" for="mensagem">Mensagem</label>
              <textarea id="mensagem" name="mensagem" rows="4" placeholder="Conte um pouco sobre você ou sua ONG."></textarea>
            </div>
          </div>
        </fieldset>

        <div class="mt-2">
          <button class="btn btn--primary" type="submit">Enviar cadastro</button>
          <button class="btn btn--ghost" type="reset">Limpar</button>
        </div>
      </form>

      <div class="toast" id="toast" role="status" aria-live="polite">Formulário enviado (exemplo).</div>
    `,
  };

  /* -------------------------------------------------------------------
     Router simples por hash (#/, #/projetos, #/cadastro)
     ------------------------------------------------------------------- */
  const routes = {
    '/': Templates.home,
    '/projetos': Templates.projetos,
    '/cadastro': Templates.cadastro,
  };

  function currentPath() {
    const h = location.hash || '#/';
    const path = h.replace(/^#/, '');
    return routes[path] ? path : '/';
  }

  function render() {
    const app = document.getElementById('app');
    if (!app) return;
    app.innerHTML = routes[currentPath()]();

    // pós-render: ligar comportamentos da rota atual
    if (currentPath() === '/cadastro') {
      Forms.init('#cadastro-form');
    }
  }

  window.addEventListener('hashchange', render);
  document.addEventListener('DOMContentLoaded', render);

  /* -------------------------------------------------------------------
     Validações + máscaras simples + autosave em localStorage
     ------------------------------------------------------------------- */
  const Forms = (() => {
    const STORE_KEY = 'ps_cadastro_draft';
	let supressResetToast = false;

    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    const digits = (v) => (v || '').replace(/\D+/g, '');

    const maskCPF = (v) =>
      digits(v).slice(0, 11)
        .replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');

    const maskPhone = (v) => {
      const d = digits(v).slice(0, 11);
      if (d.length <= 10) {
        return d.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2');
      }
      return d.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
    };

    const maskCEP = (v) => digits(v).slice(0, 8).replace(/^(\d{5})(\d)/, '$1-$2');

    function showError(input, text) {
      input.setAttribute('aria-invalid', 'true');
      input.classList.add('is-invalid');

      let msg = input.nextElementSibling;
      if (!msg || !msg.classList.contains('field-error')) {
        msg = document.createElement('div');
        msg.className = 'field-error';
        msg.style.color = '#b91c1c';
        msg.style.fontSize = '.875rem';
        msg.style.marginTop = '.25rem';
        input.insertAdjacentElement('afterend', msg);
      }
      msg.textContent = text;

      const live = $('#live-region');
      if (live) live.textContent = text;
    }
    function clearError(input) {
      input.removeAttribute('aria-invalid');
      input.classList.remove('is-invalid');
      const msg = input.nextElementSibling;
      if (msg && msg.classList.contains('field-error')) msg.remove();
    }

    function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v || ''); }
    function isCEP(v)   { return /^\d{5}-?\d{3}$/.test(v || ''); }
    function isPhone(v) { const d = digits(v); return d.length === 10 || d.length === 11; }
    function isAdult(iso) {
      if (!iso) return false;
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return false;
      const today = new Date();
      const min = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
      return d <= min;
    }
    function isCPF(v) {
      const s = digits(v);
      if (s.length !== 11 || /^(\d)\1{10}$/.test(s)) return false;
      const calc = (b) => {
        let sum = 0;
        for (let i = 0; i < b; i++) sum += parseInt(s[i], 10) * (b + 1 - i);
        const mod = (sum * 10) % 11;
        return mod === 10 ? 0 : mod;
      };
      return calc(9) === +s[9] && calc(10) === +s[10];
    }

    function validateField(input) {
      const val = (input.value || '').trim();
      const id = input.id;

      if (input.required && !val) { showError(input, 'Campo obrigatório.'); return false; }
      if (id === 'email'      && val && !isEmail(val))      { showError(input, 'Informe um e-mail válido.'); return false; }
      if (id === 'cpf'        && val && !isCPF(val))        { showError(input, 'CPF inválido.'); return false; }
      if (id === 'telefone'   && val && !isPhone(val))      { showError(input, 'Telefone inválido.'); return false; }
      if (id === 'cep'        && val && !isCEP(val))        { showError(input, 'CEP inválido (ex: 00000-000).'); return false; }
      if (id === 'nascimento' && val && !isAdult(val))      { showError(input, 'Idade mínima: 16 anos.'); return false; }

      clearError(input);
      return true;
    }

    function saveDraft(form) {
      const data = Object.fromEntries(new FormData(form).entries());
      localStorage.setItem(STORE_KEY, JSON.stringify(data));
    }
    function loadDraft(form) {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return;
      try {
        const data = JSON.parse(raw);
        Object.keys(data).forEach((k) => {
          if (form.elements[k]) form.elements[k].value = data[k];
        });
      } catch (_) {}
    }
    function clearDraft() { localStorage.removeItem(STORE_KEY); }

    function attachMasks(form) {
      const cpf = form.querySelector('#cpf');
      const tel = form.querySelector('#telefone');
      const cep = form.querySelector('#cep');
      if (cpf) cpf.addEventListener('input', () => (cpf.value = maskCPF(cpf.value)));
      if (tel) tel.addEventListener('input', () => (tel.value = maskPhone(tel.value)));
      if (cep) cep.addEventListener('input', () => (cep.value = maskCEP(cep.value)));
    }

    function attach(form) {
      // valida on-blur e autosave on-input
      form.querySelectorAll('input, select, textarea').forEach((el) => {
        el.addEventListener('blur', () => validateField(el));
        el.addEventListener('input', () => saveDraft(form));
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let ok = true;
        form.querySelectorAll('input, select, textarea').forEach((el) => {
          if (!validateField(el)) ok = false;
        });
        if (!ok) {
          const live = document.getElementById('live-region');
          if (live) live.textContent = 'Há erros no formulário. Verifique os campos destacados.';
          alert('Há erros no formulário. Corrija antes de enviar.');
          return;
        }
        clearDraft();
		form.querySelectorAll('.is-invalid, .field-error').forEach((el) => {
			el.classList?.remove('is-invalid');
			if (el.classList?.contains('field-error')) el.remove();
		});

		supressResetToast = true;
		
        form.reset();
		
		setTimeout(() => {
			toast('Cadastro enviado! (simulação)');
		}, 0);
      });

      form.addEventListener('reset', () => {
        setTimeout(() => {
          form.querySelectorAll('.is-invalid, .field-error').forEach((el) => {
            el.classList?.remove('is-invalid');
            if (el.classList?.contains('field-error')) el.remove();
          });
          clearDraft();
		  
		  if (supressResetToast) {
			  supressResetToast = false;
		  } else {
			toast('Formulário limpo.');
		  }
        }, 0);
      });
    }

    function toast(msg) {
      let el = document.getElementById('toast');
      if (!el) {
        el = document.createElement('div');
        el.id = 'toast';
        el.className = 'toast';
        document.body.appendChild(el);
      }
      el.textContent = msg;
      el.classList.add('toast--show');
      setTimeout(() => el.classList.remove('toast--show'), 3000);
    }

    function init(selector) {
      const form = document.querySelector(selector);
      if (!form) return;
      attachMasks(form);
      loadDraft(form);
      attach(form);
    }

    return { init };
  })();
})();

/* =========================================================
   Alternar modo escuro / claro (WCAG acessível)
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const btnDark = document.querySelector('#toggle-dark');
  if (!btnDark) return; // evita erro se botão não existir

  btnDark.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    // salva preferência no navegador
    const darkAtivo = document.body.classList.contains('dark');
    localStorage.setItem('tema', darkAtivo ? 'dark' : 'light');

    // muda o texto do botão
    btnDark.textContent = darkAtivo ? 'Modo claro' : 'Modo escuro';
  });

  // restaura preferência ao recarregar
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'dark') {
    document.body.classList.add('dark');
    btnDark.textContent = 'Modo claro';
  }
});

