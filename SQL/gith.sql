jobs:
  lint:
    runs-on: ubuntu-latest
    steps: [checkout, run: pip install -r requirements, run: flake8, run: bandit]
  build:
    needs: lint
    steps: [build image, run tests, cosign sign]
  canary:
    needs: build
    steps: [deploy to canary (kubectl/argo), run smoke tests]
