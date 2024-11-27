{ pkgs }: {
  deps = [
    pkgs.openssh_hpn
    pkgs.ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server  
  ];
}